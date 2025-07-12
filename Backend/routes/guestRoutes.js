const express = require("express");

const getQuestions = require("../controllers/guest/getQuestions");
const getAnswerToQuestion = require("../controllers/guest/getAnswerToQuestion");
const getCommentToAnswer = require("../controllers/guest/getCommentToAnswer");

const guestRouter = express.Router();

guestRouter.get("/questions", getQuestions);

guestRouter.get("/questions/:questionId/answers", getAnswerToQuestion);

guestRouter.get("/answers/:answerId/comments", getCommentToAnswer);

module.exports = guestRouter;