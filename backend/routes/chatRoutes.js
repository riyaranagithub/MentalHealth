import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const chatRouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }); // free tier

chatRouter.post("/", async (req, res) => {
  console.log("Request received at /chat", req.body);

  const { message, messages } = req.body;

  // 🧠 Convert chat history to readable conversation format
  const formattedHistory = messages
    .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
    .join("\n");

  const prompt = `
You are MindMate, a friendly and empathetic AI wellness companion. 
You focus on positivity, motivation, mindfulness, and self-care.

Here’s the chat so far:
${formattedHistory}

Now the user said: "${message}"

Respond in under 70 words.
Do NOT mention medicines, psychiatrists, or therapy.
If user asks for medical advice, say:
"I’m not able to give medical advice, but I can help with general tips or guidance."
Base your answer on the previous conversation to stay contextually relevant.
`;

  try {
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong 💙" });
  }
});

export default chatRouter;
