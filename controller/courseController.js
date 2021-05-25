const Project = require("../model/projectModel");
const Tag = require("./../model/tagModel");
const User = require("./../model/userModel");
const Course = require("./../model/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCoures = catchAsync(async (req, res, next) => {
  const courses = await Course.find()
    .sort("name")
    .populate({
      path: "teacher",
      ref: "User",
      select: "name email image",
    })
    .populate({
      path: "students",
      ref: "User",
      select: "name email rollNumber ",
    });

  res.status(200).json({
    status: "success",
    data: courses,
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  //Required  : name , courseCode, teacher , year , branch
  const { name, coureseCode, teacher, year, branch } = req.body;

  const Teacher = await User.findById(teacher).select(
    "role notifications notificationsSeen"
  );
  //   if (!Teacher || Teacher.role != "Teacher") {
  //     return next(new AppError("Sorry teacher id is wrond", 404));
  //   }
  const newCourse = await Course.create(req.body);

  let message = `Admin has created a new course ${name} with you as teacher`;

  let notifications = {
    message: message,
    topic: "course",
    projectId: newCourse._id,
  };

  Teacher.notifications.push(notifications);
  Teacher.notificationsSeen = false;
  await Teacher.save({ runValidators: true });

  res.status(200).json({
    status: "success",
    course: newCourse,
  });
});

exports.enrollStudents = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) {
    return next(new AppError("Course ID is not available", 404));
  }

  const course = await Course.findById(courseId);

  if (req.user.id != course.teacher) {
    return next(new AppError("You are not the teacher for this course", 404));
  }

  const studentsList = req.body.studentsList;

  if (studentsList.length == 0) {
    return next(new AppError("The students list is empty", 404));
  }

  let message = `You have been enrolled into ${course.name} course by ${req.user.name}`;
  let notification = {
    message: message,
    topic: "course",
    projectId: "",
  };
  const students = await User.updateMany(
    {
      _id: { $in: studentsList },
    },
    { $push: { notifications: notification }, notificationsSeen: false }
  );

  course.students.push(studentsList);
  await course.save();

  res.status(200).json({
    status: "success",
    updatedCourse: course,
  });
});
