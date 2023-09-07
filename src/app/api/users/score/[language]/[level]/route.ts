import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";



connect();

interface IParams {
    
      language: string;
      level: string;
    
  }

export async function PUT(request: NextRequest, { params }: { params: IParams }) {
  try {
    const { language, level } = params; // Extract language and level from URL
    const { score } = await request.json();
    console.log(score);
    console.log(language);
    console.log(level);

    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the score for the specified language and level
    user.scores[language][level] += score;

    await user.save();

    return NextResponse.json({ message: `${language} ${level} score updated successfully` });
  } catch (error) {
    console.error('Error updating score:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
