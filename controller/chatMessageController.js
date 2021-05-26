const ChatMessage = require("./../model/chatMessageModel");
const User = require("./../model/userModel");
const Course = require("./../model/courseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getAllChatMessagesByCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) return next(new AppError("No Course ID provided!"));

  if (!req.user.coursesEnrolled.includes(courseId)) {
    return next(new AppError("You are not allowed to view this course!"));
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

const sendMessage = async (chatMessage) => {
  try {
    const { userId, courseId, message } = chatMessage;

    if (!courseId) throw new AppError("No Course ID provided!", 404);

    if (!req.user.coursesEnrolled.includes(courseId)) {
      throw new AppError("You are not allowed to view this course!", 401);
    }

    const newMessage = await ChatMessage.create({
      message: message,
      user: userId,
      course: courseId,
    });
  } catch (err) {
    return err;
  }
};

module.exports = { getAllChatMessagesByCourse, sendMessage };
