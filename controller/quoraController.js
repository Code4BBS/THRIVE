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
            user : req.user,
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
    questions = await Question.find().sort({createdAt : -1}).populate({
        path : "user",
        model : "User",
        select : "name"
    });
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
            user : req.user,
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

exports.upVote = catchAsync(async(req,res,next) => {
    let question = await Question.findById(req.params.qId);
    if(question.upvotedBy.includes(req.user.id)) {
        res.status(200).json({
            message : "already upvoted",
            question
        })
        return (next);
    } else if(question.downvotedBy.includes(req.user.id)) {
        question.downvotedBy.pull(req.user);
        question.downvotes = question.downvotes-1;
        question.upvotedBy.push(req.user);
        question.upvotes = question.upvotes + 1;
        let newQuestion = await question.save();
        res.status(200).json({
            status : "success",
            newQuestion
        })
    } else {
        question.upvotedBy.push(req.user);
        question.upvotes = question.upvotes+1;
        let newQuestion = await question.save();
        res.status(200).json({
            status : "success",
            message : "upvoted Successfully",
            newQuestion
        })
        return (next);
    }
})

exports.downVote = catchAsync(async(req,res,next) => {
    let question = await Question.findById(req.params.qId);
    if(question.downvotedBy.includes(req.user.id)) {
        res.status(200).json({
            message : "already downvoted",
            question
        })
        return (next);
    } else if(question.upvotedBy.includes(req.user.id)) {
        question.upvotedBy.pull(req.user);
        question.upvotes = question.upvotes-1;
        question.downvotedBy.push(req.user);
        question.downvotes = question.downvotes + 1;
        let newQuestion = await question.save();
        res.status(200).json({
            status : "success",
            newQuestion
        })
    } else {
        question.downvotedBy.push(req.user);
        question.downvotes = question.downvotes+1;
        let newQuestion = await question.save();
        res.status(200).json({
            status : "success",
            message : "downvoted Successfully",
            newQuestion
        })
        return (next);
    }
})

exports.deleteQuestion = catchAsync(async(req,res,next) => {
    const question = await Question.findByIdAndDelete(req.params.qId);
    res.status(203).json({
        status : "success",
        message : "question deleted successfully"
    })
})