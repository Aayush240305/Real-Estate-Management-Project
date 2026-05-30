import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  message: {
    type: String,
    required: true
  }

}, { timestamps: true });

export const Feedback = mongoose.model("Feedback", feedbackSchema);