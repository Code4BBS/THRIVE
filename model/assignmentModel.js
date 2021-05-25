const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Course = require("./courseModel");
const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Assignemnt must have a name"],
      default: "Assignment",
    },
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Course must have a courseId"],
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Course must have a teacher"],
    },
    assignmentFileName: {
      type: String,
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
