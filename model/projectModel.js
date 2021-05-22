const mongoose = require("mongoose");
const validator = require("validator");
const Tag = require("./tagModel");

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
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    lastUpdatedAt: Date,
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    blacklisted: { type: Boolean, default: false },
    preRequisite: { type: String },
    communication: { type: String },
    duration: { type: String },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
