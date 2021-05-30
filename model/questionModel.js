const mongoose  = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionBody : {
        type : String,
        required : [true, "questions must have text"]
    },
    createdAt : {
        type : Date,
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
    upvotes : {
        type : Number,
        default : 0
    },
    upvotedBy : [{type : mongoose.Schema.ObjectId, ref : "User"}],
    downvotes : {
        type : Number,
        default : 0
    },
    downvotedBy : [{type : mongoose.Schema.ObjectId, ref : "User"}],
    answers : [{
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
        }
    }],
    blacklisted : {
        type : Boolean,
        default : false
    }
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;