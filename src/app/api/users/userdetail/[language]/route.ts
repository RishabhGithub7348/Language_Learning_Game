import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

interface IParams {
    
    language: string;
    level: string;
  
}

export async function GET(request: NextRequest,  { params }: { params: IParams }) {
  try {
    // Extract the language from the request query or params
    const { language } = params; 
    const userId = await getDataFromToken(request);
    const userexist = await User.findOne({ _id: userId });

    if (!userexist) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Define the fields to select based on the chosen language
    const fieldsToSelect = {
      username: 1,
      email: 1,
      [`scores.${language}.easy`]: 1,
      [`scores.${language}.medium`]: 1,
      [`scores.${language}.hard`]: 1,
    };

    // Find all users with scores related to the chosen language
    const user = await User.find(
        {
            _id: userId, // Replace with your actual user identifier field
            [`scores.${language}`]: { $exists: true },
          },
      fieldsToSelect
    );

    // Sort users by total score (sum of easy, medium, and hard scores)
    user.sort((a, b) => {
      const totalScoreA =
        (a.scores[language].easy || 0) +
        (a.scores[language].medium || 0) +
        (a.scores[language].hard || 0);

      const totalScoreB =
        (b.scores[language].easy || 0) +
        (b.scores[language].medium || 0) +
        (b.scores[language].hard || 0);

      return totalScoreB - totalScoreA;
    });

    return NextResponse.json({
      message: `Users with scores related to ${language}, sorted by total score`,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
