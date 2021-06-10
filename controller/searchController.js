const User = require("./../model/userModel");
const Project = require("./../model/projectModel");
const Tag = require("./../model/tagModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.searchUser = catchAsync(async (req, res, next) => {
  let searchQuery = req.params.query;
  searchQuery = new RegExp(
    searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    "gi"
  );

  const users = await User.find({ name: searchQuery })
    .select("_id email name image verifyStatus")
    .sort({ verifyStatus: -1 })
    .lean();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.searchByTag = catchAsync(async (req, res, next) => {
  try {
    const queryTags = req.body.tagsSelected;

    const users = await User.find({
      tags: { $all: queryTags },
    })
      .select("name email image rollNumber")
      .sort({ endorse: -1, name: 1 })
      .lean();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
});

exports.searchProjectsByTag = catchAsync(async (req, res, next) => {
  try {
    const queryTags = req.body.tagsSelected;

    const projects = await Project.find({
      tags: { $all: queryTags },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "tags",
        model: "Tag",
        select: "name ",
      })
      .populate({ path: "owner", model: "User", select: "name image" })
      .populate({ path: "collaborators", model: "User", select: "name image" });

    res.status(200).json({
      status: "success",
      data: {
        projects,
      },
    });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
});
