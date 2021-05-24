const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answer : {
        type : String,
        required : true
    },
    isAnonymous : {
        type : Boolean,
        default : 0
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    question : {
        type : mongoose.Schema.ObjectId,
        ref : "Question"
    }
})

const Answer = mongoose.model("Answer",answerSchema);
module.exports = Answer;