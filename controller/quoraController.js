const Question = require("./../model/questionModel");
const catchAsync = require("./../utils/catchAsync");

exports.createQuestion = catchAsync(async (req, res, next) => {
  let question = {};
  if (req.body.isAnonymous) {
    question = {
      questionBody: req.body.questionBody,
      createdAt: Date.now(),
      isAnonymous: req.body.isAnonymous,
    };
  } else {
    question = {
      questionBody: req.body.questionBody,
      createdAt: Date.now(),
      user: req.user,
      isAnonymous: req.body.isAnonymous,
    };
  }

  const newQuestion = await Question.create(question);

  res.status(201).json({
    status: "success",
    message: "question created successfully",
    data: newQuestion,
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  let questions = {};
  let query = {};
  if (req.user.role != "admin") {
    query = { blacklisted: false };
  }
  questions = await Question.find(query).sort({ createdAt: -1 }).populate({
    path: "user",
    model: "User",
    select: "name",
  });
  res.status(200).json({
    status: "success",
    questions,
  });
});

exports.getAQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
    .populate("user")
    .populate({
      path: "answers.user",
      select: "name",
    });
  res.status(200).json({
    status: "success",
    question,
  });
});

exports.createAnswer = catchAsync(async (req, res, next) => {
  let Answer = {};
  if (req.body.isAnonymous) {
    Answer = {
      answer: req.body.answer,
      isAnonymous: req.body.isAnonymous,
      // question : req.params.qId
    };
  } else {
    Answer = {
      answer: req.body.answer,
      isAnonymous: req.body.isAnonymous,
      user: req.user,
      // question : req.params.qId
    };
  }

  let question = await Question.findById(req.params.qId);
  question.answers.push(Answer);
  let finalQuestion = await question.save();

  res.status(201).json({
    status: "success",
    finalQuestion,
  });
});

exports.upVote = catchAsync(async (req, res, next) => {
  let question = await Question.findById(req.params.qId);
  if (question.upvotedBy.includes(req.user.id)) {
    let newQuestion = question;
    res.status(200).json({
      message: "already upvoted",
      newQuestion,
    });
    return next;
  } else if (question.downvotedBy.includes(req.user.id)) {
    question.downvotedBy.pull(req.user);
    question.downvotes = question.downvotes - 1;
    question.upvotedBy.push(req.user);
    question.upvotes = question.upvotes + 1;
    let newQuestion = await question.save();
    res.status(200).json({
      status: "success",
      newQuestion,
    });
  } else {
    question.upvotedBy.push(req.user);
    question.upvotes = question.upvotes + 1;
    let newQuestion = await question.save();
    res.status(200).json({
      status: "success",
      message: "upvoted Successfully",
      newQuestion,
    });
    return next;
  }
});

exports.downVote = catchAsync(async (req, res, next) => {
  let question = await Question.findById(req.params.qId);
  if (question.downvotedBy.includes(req.user.id)) {
    let newQuestion = question;
    res.status(200).json({
      message: "already downvoted",
      newQuestion,
    });
    return next;
  } else if (question.upvotedBy.includes(req.user.id)) {
    question.upvotedBy.pull(req.user);
    question.upvotes = question.upvotes - 1;
    question.downvotedBy.push(req.user);
    question.downvotes = question.downvotes + 1;
    let newQuestion = await question.save();
    res.status(200).json({
      status: "success",
      newQuestion,
    });
  } else {
    question.downvotedBy.push(req.user);
    question.downvotes = question.downvotes + 1;
    let newQuestion = await question.save();
    res.status(200).json({
      status: "success",
      message: "downvoted Successfully",
      newQuestion,
    });
    return next;
  }
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  let question = await Question.findById(req.params.qId).populate("user");

  if (!question.user._id.equals(req.user._id)) {
    res.status(403).json({
      status: "forbidden",
      message: "You aren't allowed to delete other peoples questions",
    });
    return next;
  }
  // //console.log(1);
  question = await Question.findByIdAndDelete(req.params.qId);
  res.status(203).json({
    status: "success",
    message: "question deleted successfully",
  });
});

exports.blacklistQuestion = catchAsync(async (req, res, next) => {
  await Question.findByIdAndUpdate(req.params.qId, { blacklisted: true });
  res.status(201).json({
    status: "success",
    message: "question blacklisted successfully",
  });
});
exports.deleteAllQuestions = catchAsync(async (req, res, next) => {
  await Question.deleteMany({});
  res.status(200).json({
    status: "success",
    message: "Deleted All Questions",
  });
});
