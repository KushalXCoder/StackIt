import mongoose from "mongoose";
import Question from "./question.schema";
import User from "./user.schema";

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: Question,
        required: true
    },
    answeredBy: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    upvote: [{
        type: mongoose.Schema.ObjectId,
        ref: User
    }],
    downvote: [{
        type: mongoose.Schema.ObjectId,
        ref: User
    }],
    content: {
        type: String,
        required: true
    },
    mentions: [{
        type: mongoose.Schema.ObjectId,
        ref: User
    }],
    imageUrl: [{
        type: String,
        required: false
    }]
}, {
    timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;