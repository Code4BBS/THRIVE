const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Assignemnt must have a name"],
      default: "Assignment",
    },
    courseId: {
      type: String,
      required: [true, "Course must have a code"],
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Course must have a teacher"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    students: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        fileName: {
          type: String,
        },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
