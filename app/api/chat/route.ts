import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the handler for the POST request
export async function POST(request: Request) {
  const { userInput } = await request.json();

  if (!userInput || typeof userInput !== "string") {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant knowledgeable about Hamza Dincer.",
        },
        { role: "user", content: userInput },
      ],
    });

    const botResponse =
      response.choices[0].message?.content || "I'm here to help.";

    return NextResponse.json({ reply: botResponse });
  } catch (error) {
    console.error("Error in getCustomResponse:", error);
    return NextResponse.json(
      { message: "Error generating response" },
      { status: 500 },
    );
  }
}
