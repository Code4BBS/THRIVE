const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Chat Message must have a user"],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "Chat Message must have a course"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessage;
