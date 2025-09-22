// routes/conversationRoutes.js
import express from "express";
import Conversation from "../models/conversation.js";

const conversationRouter = express.Router();

// Save conversation
conversationRouter.post("/save", async (req, res) => {
  try {

    console.log("Request received at /conversation/save", req.body);
    const { messages } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const newConversation = new Conversation({ userId, messages });
    await newConversation.save();

    res.json({ success: true, message: "Conversation saved!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save conversation" });
  }
});

// Get all conversations for a user
conversationRouter.get("/", async (req, res) => {
  try {
    
    const userId  = req.user._id; // Assuming user ID is available in req.user
    console.log("Fetching conversations for user:", userId);
    const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// Get a specific conversation by ID
conversationRouter.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.id, userId: req.user._id });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
}
);

// Delete a specific conversation by ID
conversationRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Conversation.deleteOne({ _id: req.params.id, userId: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Conversation not found or not authorized" });
    }
    res.json({ success: true, message: "Conversation deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete conversation" });
  }
}
);

export default conversationRouter;
