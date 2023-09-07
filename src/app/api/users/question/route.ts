import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/usersModel";
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Extract user ID from token (you might need to implement this)
    const userId = await getDataFromToken(request);

    // Extract data from the request body
    const { language, level, question, options, correctAnswer } = await request.json();

    // Find the user (you may need to replace this with your actual user retrieval logic)
    const user = await User.findOne({ _id: userId });
    console.log(language, level, question, options, correctAnswer);

    // Define the path to the data file
    const dataFilePath = path.join(process.cwd(), '/src/question/data.json');
    console.log(dataFilePath);

    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      console.log('File does not exist');
      return NextResponse.json({ error: 'File does not exist' }, { status: 404 });
    }

    // Load the existing data
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(rawData);

    // Create a new question object
    const newQuestion = {
      question,
      options: options.map((option:any) => ({ text: option.text, correct: option.correct })),
    };
    console.log(newQuestion);

    // Check if the language exists in the data
    if (!data[language]) {
      data[language] = {
        easy: [],
        medium: [],
        hard: [],
      };
    }

    // Add the new question to the specified level
    data[language][level].push(newQuestion);

    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

    console.log('Question added successfully');

    return NextResponse.json({ message: 'Question submitted successfully' });
  } catch (error) {
    console.error('Error inserting Question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
