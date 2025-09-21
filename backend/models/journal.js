import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        enum: ["happy", "sad", "anxious", "angry", "calm", "neutral", "excited"]
    },
    stressLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    energyLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    triggers: { type: String },
    gratitude: { type: String },
    copingActivities: [{ type: String }], // array of selected activities
    sleepQuality: {
        type: String,
        enum: ["poor", "average", "good", "excellent"]
    },
    reflection: { type: String },
});


export default mongoose.model("Journal", journalSchema);
