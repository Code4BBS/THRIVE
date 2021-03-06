const User = require("./../model/userModel");
const Tag = require("./../model/tagModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { sendEmail } = require("../utils/sendEmail");

exports.aboutMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("This user is not present", 401));
  }
  res.status(200).json({
    status: "suceess",
    data: {
      user: req.user,
    },
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("This user is not present", 401));
  }
  req.user.notificationsSeen = true;
  await req.user.save();
  res.status(200).json({
    status: "suceess",
    data: {
      notifications: req.user.notifications,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ _id: req.query.id })
    .populate({
      path: "tags",
      model: "Tag",
    })
    .lean();

  if (!user) {
    return next(new AppError("This user is not present", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.email || req.body.name) {
    return next(
      new AppError("Sorry you are not allowed to change name and email", 401)
    );
  }

  // if (!req.user.autoVerify) {
  //   req.body.verifyStatus = false;
  // } else {
  //   req.body.verifyStatus = true;
  // }

  const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "tags",
    model: "Tag",
    select: "name group",
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let roles = ["user", "admin"];

  const docs = await User.find({ role: { $in: roles } })
    .select("name email image rollNumber")
    .sort({ name: 1 })
    .lean();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  let roles = ["Teacher"];

  const docs = await User.find({ role: { $in: roles } })
    .select("name email image ")
    .sort({ name: 1 })
    .lean();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  const docs = await Tag.find({}).lean();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.reportUser = catchAsync(async (req, res, next) => {
  const reportedUser = await User.findById(req.params.id);

  if (!reportedUser) {
    return next(new AppError("The user to be reported is not present", 400));
  }

  if (reportedUser.reporters && reportedUser.reporters.includes(req.user._id)) {
    res.status(200).json({
      status: "success",
      message: "This user is already reported by you",
    });
  } else {
    const newReportCount = reportedUser.reportCount + 1;
    let publishStatus = true;
    if (newReportCount > 4) {
      publishStatus = false;
      await sendEmail({
        email: reportedUser.email,
        subject: `Your profile has been unpublished.`,
        message: `Hey ${reportedUser.name}, Your profile on the Discovery Portal has been unpublished.\nContact admin for republishing it.`,
        attachments: [],
      });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      reportCount: newReportCount,
      publishStatus: publishStatus,
      $push: { reporters: req.user._id },
    });

    res.status(200).json({
      status: "Success",
      message: "The user has been successfully reported",
      data: updatedUser,
    });
  }
});

exports.seenNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    notificationsSeen: true,
  });
  res.status(200).json({
    status: "success",
    notifications: user.notifications,
  });
});

exports.endorseUser = catchAsync(async (req, res, next) => {
  const endorsedUser = await User.findById(req.params.id);

  if (!endorsedUser) {
    return next(new AppError("The user to be endorseed is not present", 400));
  }

  if (endorsedUser.endorsers && endorsedUser.endorsers.includes(req.user._id)) {
    res.status(200).json({
      status: "success",
      message: "This user is already endorsed by you",
    });
  } else {
    const newendorseCount = endorsedUser.endorse + 1;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      endorse: newendorseCount,
      $push: { endorsers: req.user._id },
    });

    res.status(200).json({
      status: "Success",
      message: "The user has been successfully endorseed",
      data: updatedUser,
    });
  }
});

exports.clearReports = catchAsync(async (req, res, next) => {
  if (!req.query.id) {
    return next(new AppError("There is no id in query", 403));
  }

  let user = await User.findByIdAndUpdate(
    req.query.id,
    { endorse: 0, endorsers: [] },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("There is no user with this id", 403));
  }

  res.status(200).json({
    status: "success",
    message: "successfully cleared endorsements",
  });
});
