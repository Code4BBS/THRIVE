const Project = require("../model/projectModel");
const Tag = require("./../model/tagModel");
const User = require("./../model/userModel");
const Assignment = require("./../model/AssignmentModel");
const Course = require("./../model/courseModel");
const ChatMessage = require("./../model/chatMessageModel");
const mongoose = require("mongoose");
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
  let courses;
  if (req.user.role !== "Teacher") {
    courses = await Course.find({ _id: { $in: req.body } }).populate({
      path: "teacher",
      model: "User",
      select: "name email image",
    });
  } else {
    courses = await Course.find({ teacher: req.user._id }).populate({
      path: "teacher",
      model: "User",
      select: "name email image",
    });
  }
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
  const { name, courseCode, email, year, branch } = req.body;
  console.log(typeof email);
  const Teacher = await User.findOneAndUpdate(
    { email: email },
    { role: "Teacher" }
  ).select("role notifications notificationsSeen");
  //   if (!Teacher || Teacher.role != "Teacher") {
  //     return next(new AppError("Sorry teacher id is wrond", 404));
  //   }
  const data = {
    name: name,
    courseCode: courseCode,
    teacher: Teacher._id,
    year: year,
    branch: branch,
  };
  const newCourse = await Course.create(data);

  let message = `Admin has created a new course ${name} with you as teacher`;

  let notifications = {
    message: message,
    type: "courseCreated",
    course: {
      _id: newCourse._id,
      code: courseCode,
      name: name,
      teacher: Teacher.name,
    },
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

  const course = await Course.findById(courseId).populate({
    path: "teacher",
    model: "User",
    select: "name",
  });

  if (req.user.id != course.teacher.id) {
    return next(new AppError("You are not the teacher for this course", 404));
  }

  const { studentEmail } = req.body;

  let message = `Enrolled into ${course.name} course by ${req.user.name}`;
  let notification = {
    message: message,
    type: "courseEnrolled",
    course: {
      _id: course._id,
      code: course.code,
      name: course.name,
      teacher: course.teacher.name,
    },
  };
  const student = await User.findOneAndUpdate(
    {
      email: studentEmail,
    },
    {
      $push: { notifications: notification, coursesEnrolled: course._id },
      notificationsSeen: false,
    }
  ).select("name email rollNumber image branch");

  if (!student) {
    return next(new AppError("This student is not present", 403));
  }
  course.students.push(student._id);
  await course.save();

  res.status(200).json({
    status: "success",
    updatedCourse: course,
    student: student,
  });
});

exports.getStudentsOfCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) {
    return next(new AppError("Course Id is not mentioned", 404));
  }

  const roles = ["user", "admin"];

  const students = await User.find({
    coursesEnrolled: { $in: [courseId] },
    role: roles,
  }).select("name branch rollNumber image email");

  res.status(200).json({
    status: "success",
    data: students,
  });
});

exports.createAssignment = catchAsync(async (req, res, next) => {
  // if (!req.params.id) {
  //   return next(new AppError("Course Id is not mentioned", 404));
  // }
  console.log(req.query);
  const courseId = req.query.courseId;
  const name = req.query.name;
  const description = req.query.description;
  const deadline = req.query.deadline;
  console.log(courseId);
  // if(req.user.role != "Teacher"){
  //   return next(new AppError('Only teachers are allowed to post assignment',404));
  // }

  const teacher = req.user.id;
  let data = {
    name: name,
    teacher: teacher,
    courseId: courseId,
    description: description,
    deadline: deadline,
  };

  if (req.file) {
    data.assignmentFileName = req.file.filename;
  }

  const newAssignment = await Assignment.create(data);

  if (!newAssignment) {
    return next(new AppError("Some problem occured", 403));
  }
  let message = `New Assignment ${name} is created`;

  let notificationMessage = {
    message: message,
    type: "assignment",
    project: { _id: newAssignment._id, title: "Assignment" },
  };

  const course = [courseId];

  const users = await User.updateMany(
    {
      coursesEnrolled: courseId,
    },
    { $push: { notifications: notificationMessage }, notificationsSeen: false }
  );
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

  const assignments = await Assignment.find({ courseId: courseId })
    .sort("-createdAt")
    .populate({
      path: "teacher",
      ref: "User",
      selecte: "name email",
    });

  res.status(200).json({
    status: "success",
    data: assignments,
  });
});

exports.getAssignment = catchAsync(async (req, res, next) => {
  const assignmentId = req.params.id;
  if (!assignmentId) {
    return next(new AppError("Assignment Id is not mentioned", 404));
  }

  const assignment = await Assignment.findById(assignmentId)
    .populate({
      path: "teacher",
      ref: "User",
      select: "name email image",
    })
    .populate({
      path: "courseId",
      ref: "Course",
      select: "courseCode name",
    });

  res.status(200).json({
    status: "success",
    data: assignment,
  });
});

exports.submitAssignment = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;
  const studentData = [{ user: studentId }];

  let fileName = "";
  if (req.file) {
    fileName = req.file.filename;
  }
  studentData[0].fileName = fileName;

  const submitAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
    $push: { students: studentData },
  });
  if (!submitAssignment) {
    return next(new AppError("Some internal problem", 404));
  }

  res.status(200).json({
    status: "success",
    data: fileName,
  });
});

exports.getAllChatMessagesByCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) return next(new AppError("No Course ID provided!", 400));

  const course = await Course.findById(courseId);

  if (
    !req.user.coursesEnrolled.includes(courseId) &&
    !req.user.id === course.teacher
  ) {
    return next(new AppError("You are not allowed to view this course!", 401));
  }

  const chatMessages = await ChatMessage.find({ course: courseId }).populate({
    path: "user",
    ref: "User",
    select: "name email image ",
  });

  res.status(200).json({
    status: "success",
    data: { results: chatMessages.length, chatMessages },
  });
});

exports.sendMessage = async (chatMessage) => {
  try {
    // console.log("Send Message Triggered");
    const { userId, courseId, message, createdAt } = chatMessage;

    if (!courseId) return new AppError("No Course ID provided!", 404);

    const newMessage = await ChatMessage.create({
      message: message,
      user: userId,
      course: courseId,
      createdAt,
    });
  } catch (err) {
    return err;
  }
};

exports.getAssignmentsByDeadline = catchAsync(async (req, res, next) => {
  const deadline = req.query.deadline;
  const coursesEnrolled = req.user.coursesEnrolled;

  console.log(coursesEnrolled);

  console.log(deadline);
  const assignments = await Assignment.find({
    courseId: { $in: coursesEnrolled },
    deadline: deadline,
  }).populate({
    path: "teacher",
    ref: "User",
    select: "name image",
  });

  console.log(assignments);

  res.status(200).json({
    status: "success",
    data: assignments,
  });
});
