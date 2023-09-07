import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

interface IParams {
    
    language: string;
    level: string;
  
}

export async function GET(request: NextRequest,  { params }: { params: IParams }) {
  try {
    // Extract the language from the request query or params
    const { language } = params; 
    // Define the fields to select based on the chosen language
    const fieldsToSelect = {
      username: 1,
      email: 1,
      [`scores.${language}.easy`]: 1,
      [`scores.${language}.medium`]: 1,
      [`scores.${language}.hard`]: 1,
    };

    // Find all users with scores related to the chosen language
    const users = await User.find(
      {
        [`scores.${language}`]: { $exists: true },
      },
      fieldsToSelect
    );

    // Sort users by total score (sum of easy, medium, and hard scores)
    users.sort((a, b) => {
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
      data: users,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
