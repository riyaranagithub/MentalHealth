import mongoose from "mongoose";

const moodEmojiMap = {
  happy: "😊",
  sad: "😢",
  anxious: "😰",
  angry: "😡",
  calm: "😌",
  neutral: "😐",
  excited: "🤩",
};

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

}
,{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for emoji
journalSchema.virtual("moodEmoji").get(function () {
  return typeof this.mood === "string" ? moodEmojiMap[this.mood] : undefined;
});

export default mongoose.model("Journal", journalSchema);
