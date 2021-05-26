const Project = require("../model/projectModel");
const Tag = require("./../model/tagModel");
const User = require("./../model/userModel");
const Assignment = require("./../model/AssignmentModel");
const Course = require("./../model/courseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { assign } = require("nodemailer/lib/shared");

exports.getAllCourses = catchAsync(async (req, res, next) => {
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

exports.getMyCourses = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const courses = await Course.find({ _id: { $in: req.body } }).populate({
    path: "teacher",
    model: "User",
    select: "name email image",
  });

  res.send(courses);
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const course = await Course.findById(id).populate({
    path: "teacher",
    ref: "User",
    select: "name email image",
  });

  res.send(course);
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

  // if (req.user.id != course.teacher) {
  //   return next(new AppError("You are not the teacher for this course", 404));
  // }

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
    {
      $push: { notifications: notification, coursesEnrolled: course._id },
      notificationsSeen: false,
    }
  );

  course.students.push(studentsList);
  await course.save();

  res.status(200).json({
    status: "success",
    updatedCourse: course,
  });
});

exports.createAssignment = catchAsync(async (req, res, next) => {
  // if (!req.params.id) {
  //   return next(new AppError("Course Id is not mentioned", 404));
  // }
  console.log(req.query);
  const courseId = req.query.courseId;
  const name = req.query.name;
  // if(req.user.role != "Teacher"){
  //   return next(new AppError('Only teachers are allowed to post assignment',404));
  // }

  const teacher = req.user.id;
  let data = {
    name: name,
    teacher: teacher,
    courseId: courseId,
  };

  if (req.file) {
    data.assignmentFileName = req.file.filename;
  }

  const newAssignment = await Assignment.create(data);

  if (!newAssignment) {
    return next(new AppError("Some problem occured", 403));
  }
  res.status(200).json({
    status: "success",
    data: newAssignment,
  });
});

exports.getAllAssignmentsOfCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) {
    return next(new AppError("Course Id is not mentioned", 404));
  }

  const assignments = await Assignment.find({ courseId: courseId }).populate({
    path: "teacher",
    ref: "User",
    selecte: "name email",
  });

  res.status(200).json({
    status: "success",
    data: assignments,
  });
});
