import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have your API key stored in Vercel's environment variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic, question_count } = req.body;

  const prompt = `Construct a quiz that is ${question_count} questions long, where each question has 4 options and the answer is provided with each question. The quiz should be about ${topic}. Your response should be in JSON format and I will provide an example of what it should look like below:

  [
      {
        "question": "What is Naruto's signature jutsu?",
        "options": {
          "A": "Chidori",
          "B": "Rasengan",
          "C": "Amaterasu",
          "D": "Shadow Possession"
        },
        "answer": "B"
      },
      // Example continues...
  ]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const regex = /\[.*\]/s; // This will match everything between square brackets
    const match = response.choices[0].message.content.match(regex);

    if (match) {
      const quizData = JSON.parse(match[0]); // Extract and parse the quiz data
      res.status(200).json(quizData);
    } else {
      res.status(500).json({ error: "Failed to parse quiz data" });
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
