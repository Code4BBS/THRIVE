const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project must have a name"],
    },
    description: {
      type: String,
      required: [true, "Project must have a description"],
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    preRequsite: String,
    lastUpdatedAt: Date,
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    blacklisted: { type: Boolean, default: false },
    communication: { type: String },
    whatsApp: {
      type: Number,
      validate: [validator.isMobilePhone, "Enter a Valid Phone Number"],
    },
    linkedIn: { type: String, validate: [validator.isURL] },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
