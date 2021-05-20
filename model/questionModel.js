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
    isAnanymous : {
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
    // answers : [{type : mongoose.Schema.ObjectId, ref : "Answer"}]
    answers : [{
        answer : {
            type : String,
            required : true
        },
        isAnanymous : {
            type : Boolean,
            default : 0
        },
        user : {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        }
    }]
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;