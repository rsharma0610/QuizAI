import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

const app = express();
const port = 4000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure you have your API key stored in a .env file
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/generate-quiz", async(req, res) => {
    const {topic, question_count} = req.body;
    
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
        {
          "question": "Who is the leader of Team 7 in the original Naruto series?",
          "options": {
            "A": "Jiraiya",
            "B": "Kakashi Hatake",
            "C": "Itachi Uchiha",
            "D": "Tsunade"
          },
          "answer": "B"
        },
        {
          "question": "What is the name of Naruto's tailed beast?",
          "options": {
            "A": "Shukaku",
            "B": "Matatabi",
            "C": "Kurama",
            "D": "Gyuki"
          },
          "answer": "C"
        },
        {
          "question": "What clan does Sasuke belong to?",
          "options": {
            "A": "Uzumaki",
            "B": "Hyuga",
            "C": "Nara",
            "D": "Uchiha"
          },
          "answer": "D"
        },
        {
          "question": "What is the goal of the Akatsuki organization?",
          "options": {
            "A": "To collect all tailed beasts",
            "B": "To destroy the Hidden Leaf Village",
            "C": "To revive Madara Uchiha",
            "D": "To gain control over all ninja villages"
          },
          "answer": "A"
        }
      ]`

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ],
        });
        const regex = /\[.*\]/s;  // This will match everything between square brackets

        // Match the content
        const match = response.choices[0].message.content.match(regex);

        if (match) {
            console.log(match);
            const quizData = JSON.parse(match[0]);  // match[0] contains the entire matched string (including the brackets)
            console.log(quizData);
            res.json(quizData)
        } else {
            console.error("No match found");
        }
        

    }catch(error){
        console.error("Error generating quiz:", error);
        res.status(500).json({ error: "Failed to generate quiz" });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });


