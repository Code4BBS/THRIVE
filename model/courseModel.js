const mongoose = require("mongoose");
const validator = require("validator");
const Tag = require("./tagModel");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course must have a name"],
    },
    courseCode: {
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
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    year: {
      type: String,
      default: "Second year",
      required: [true, "Course must have year field"],
    },
    branch: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "MM"],
      required: [true, "Course must belong to a branch"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
