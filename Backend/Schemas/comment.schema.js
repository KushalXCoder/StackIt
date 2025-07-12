import mongoose from "mongoose";
import User from "./user.schema";
import Answer from "./answer.schema";

const commentSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    answerId: {
        type: mongoose.Schema.ObjectId,
        ref: Answer,
        required: true
    },
    mentions: [{
        type: mongoose.Schema.ObjectId,
        ref: User
    }],
    content: {
        type: String,
        required: true
    },
    imagesUrl: [{
        type: String,
        required: false
    }]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;