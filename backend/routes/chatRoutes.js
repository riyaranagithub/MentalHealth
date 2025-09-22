import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const chatRouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }); // free tier

chatRouter.post("/", async (req, res) => {
    console.log("Request received at /chat", req.body);

    const { message } = req.body;
    const prompt = `
You are a friendly AI assistant.
Answer the user’s questions WITHOUT ever mentioning medicines, psychiatrists, therapists, or medical treatments.
If the user asks for medical advice, respond: 
"I’m not able to give medical advice, but I can help with general tips or guidance."
Focus only on general wellness, lifestyle, motivation, and safe advice.
User: ${message}
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
