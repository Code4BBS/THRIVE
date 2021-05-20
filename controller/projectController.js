const Project = require("../model/projectModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { findByIdAndDelete } = require("../model/projectModel");

const getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    status: "success",
    data: {
      res: projects.length,
      projects,
    },
  });
});

const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) return next(new AppError("Project not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

const createProject = catchAsync(async (req, res, next) => {
  // const owner = req.user;
  // if (!owner) return next(new AppError("No user Found",500));

  const { title, description, tagsList, preRequsite, communication } = req.body;

  const tags = tagsList.split(",");

  if (!title || !description || !communication)
    return next(new AppError("All Required Fields not there", 400));

  const newProject = await Project.create({
    title,
    description,
    tags,
    preRequsite,
    communication,
    // owner,
  });

  res.status(201).json({
    status: "success",
    message: "Project created successfully",
    project: newProject,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const updateBody = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tagsList.split(","),
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
});

const deleteProject = catchAsync(async (req, res, next) => {
  const project = await findByIdAndDelete(req.params.id);

  if (!project) return next(new AppError("Project not found", 404));

  res.status(204).json({
    status: "success",
    message: "Project deleted successfully",
  });
});

const blacklistProject = catchAsync(async (req, res, next) => {
  const project = await findByIdAndUpdate(req.params.id, { blacklisted: true });

  if (!project) return next(new AppError("Project not found", 404));

  res.status(200).json({
    status: "success",
    message: "Project blacklisted successfully",
  });
});

const whitelistProject = catchAsync(async (req, res, next) => {
  const project = await findByIdAndUpdate(req.params.id, {
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
