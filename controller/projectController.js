const Project = require("../model/projectModel");
const Tag = require("./../model/tagModel");
const User = require("./../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { findByIdAndDelete } = require("../model/projectModel");

const getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({ blacklisted: false })
    .populate({
      path: "tags",
      model: "Tag",
      select: "name ",
    })
    .populate({ path: "owner", model: "User", select: "name image" });

  res.status(200).json({
    status: "success",
    data: {
      res: projects.length,
      projects,
    },
  });
});

const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate({
      path: "tags",
      model: "Tag",
      select: "name ",
    })
    .populate({ path: "owner", model: "User", select: "name image" });

  if (!project) return next(new AppError("Project not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

const createProject = catchAsync(async (req, res, next) => {
  const owner = req.user.id;
  if (!owner) return next(new AppError("No user Found", 500));

  const { title, description, preRequisite, communication, duration, tags } =
    req.body;
  console.log(tags);
  if (!title || !description || !communication)
    return next(new AppError("All Required Fields not there", 400));

  const newProject = await Project.create({
    title,
    description,
    tags,
    preRequisite,
    communication,
    owner,
    duration,
  });
  const message = `Project ${title} requirements are matching your profile`;
  console.log(message);
  const updatedUsers = await User.updateMany(
    {
      tags: { $all: tags },
    },
    { $push: { notifications: message }, notificationsSeen: false }
  );

  res.status(201).json({
    status: "success",
    message: "Project created successfully",
    project: newProject,
    // updatedUsers,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const updateBody = {
    title: req.body.title,
    description: req.body.description,
    preRequsite: req.body.preRequsite,
    communication: req.body.communication,
    lastUpdatedAt: new Date(),
  };

  const project = await Project.findByIdAndUpdate(req.params.id, updateBody, {
    new: true,
    runValidators: true,
  }).populate({ path: "owner", model: "User", select: "name" });

  if (!project) return next(new AppError("Project cannot be updated", 500));

  res.status(200).json({
    status: "success",
    message: "Project updated successfully",
    project: project,
  });
  console.log("reached");
});

const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) return next(new AppError("Project not found", 404));

  res.status(204).json({
    status: "success",
    message: "Project deleted successfully",
  });
});

const blacklistProject = catchAsync(async (req, res, next) => {
  console.log(req.params.id);

  const project = await Project.findByIdAndUpdate(req.params.id, {
    blacklisted: true,
  });

  if (!project) return next(new AppError("Project not found", 404));

  res.status(200).json({
    status: "success",
    message: "Project blacklisted successfully",
  });
});

const whitelistProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, {
    blacklisted: false,
  });

  if (!project) return next(new AppError("Project not found", 404));

  res.status(200).json({
    status: "success",
    message: "Project whitelisted successfully",
  });
});

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  whitelistProject,
  blacklistProject,
};
