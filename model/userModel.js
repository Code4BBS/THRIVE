const mongoose = require("mongoose");
const validator = require("validator");
const Tag = require("./tagModel");
const Course = require("./courseModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the user should be specified"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    role: {
      type: String,
      enum: [
        "user",
        "admin",
        "superAdmin",
        "respresentative",
        "Teacher",
        "collegeAdmin",
        "studentAdmin",
      ],
      default: "user",
    },
    image: {
      type: String,
      default: null,
    },

    hostel: {
      type: String,
      default: null,
    },
    room: {
      type: String,
      default: "Not Specified",
    },
    rollNumber: {
      type: String,
    },
    admissionYear: {
      type: Number,
      max: [new Date().getFullYear(), "Invalid year of admission"],
    },
    graduationYear: {
      type: Number,
    },
    program: {
      type: String,
      default: "Not Specified",
    },
    branch: {
      type: String,
      default: "Not Specified",
    },
    phoneNumber: {
      type: String,
    },
    bio: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
      },
    ],
    links: [
      {
        url: {
          type: String,
        },
        name: {
          type: String,
          enum: ["LinkedIn", "GitHub", "Facebook", "Instagram", "Twitter"],
        },
      },
    ],
    endorse: {
      type: Number,
      default: 0,
    },
    endorsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    notifications: [
      {
        message: { type: String },
        project: { _id: String, title: String },
        type: {
          type: String,
          enum: [
            "profileMatch",
            "collaboratorAdd",
            "joinRequest",
            "requestAccept",
            "requestReject",
          ],
        },
        requester: { _id: String, name: String, image: String },
        topic: {
          type: String,
        },
      },
    ],
    notificationsSeen: {
      type: Boolean,
      default: true,
    },
    coursesEnrolled: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ name: "text", email: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
