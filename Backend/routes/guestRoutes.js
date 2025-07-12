const express = require("express");

const getQuestions = require("../controllers/guest/getQuestions");
const getAnswerToQuestion = require("../controllers/guest/getAnswerToQuestion");
const getCommentToAnswer = require("../controllers/guest/getCommentToAnswer");

console.log({ getQuestions, getAnswerToQuestion, getCommentToAnswer });

const guestRouter = express.Router();

// Get all questions
guestRouter.get("/questions", getQuestions);

// Get answers for a specific question
guestRouter.get("/questions/:questionId/answers", getAnswerToQuestion);

// Get comments for a specific answer
guestRouter.get("/answers/:answerId/comments", getCommentToAnswer);

module.exports = guestRouter;