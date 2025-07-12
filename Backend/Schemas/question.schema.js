import mongoose from 'mongoose';
import User from './user.schema';


const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    askedBy: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    answers: [{
        type: mongoose.Schema.ObjectId,
        ref: Answer
    }],
    acceptedAnswer: {
        type: mongoose.Schema.ObjectId,
        ref: Answer
    },
    tags: [{
        type: String,
    }],
    imagesUrl: [{
        type: String,
        required: false
    }]
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

export default Question;