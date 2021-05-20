const Question = require("./../model/questionModel");
const Answer = require("./../model/answerModel");
const catchAsync = require("./../utils/catchAsync");

exports.createQuestion = catchAsync(async (req,res,next) => {
    let question = {};
    if(req.body.isAnanymous) {
        question = {
            questionBody : req.body.questionBody,
            createdAt : Date.now(),
            isAnanymous : req.body.isAnanymous
        }
    } else{
        question = {
            questionBody : req.body.questionBody,
            createdAt : Date.now(),
            // user : req.user,
            isAnanymous : req.body.isAnonymous
        }
    }

    const newQuestion = await Question.create(question);

    res.status(201).json({
        status : "success",
        message : "question created successfully",
        data : newQuestion
    })
})

exports.getAllQuestions = catchAsync(async (req,res,next) => {
    let questions = {};
    questions = await Question.find().sort({createdAt : -1});
    res.status(200).json({
        status : "success",
        questions
    })
})

exports.getAQuestion = catchAsync(async(req,res,next) => {
    const question = await Question.findById(req.params.id);
    res.status(200).json({
        status : "success",
        question
    })
})

exports.createAnswer = catchAsync(async (req,res,next) => {
    let Answer = {};
    if(req.body.isAnonymous) {
        Answer = {
            answer : req.body.answer,
            isAnanymous : req.body.isAnanymous,
            // question : req.params.qId
        }
    } else {
        Answer = {
            answer : req.body.answer,
            isAnanymous : req.body.isAnanymous,
            // user : req.user,
            // question : req.params.qId
        }
    }
    let question = await Question.findById(req.params.qId);
    question.answers.push(Answer);
    let finalQuestion = await question.save();

    res.status(201).json({
        status : "success",
        finalQuestion
    })
})