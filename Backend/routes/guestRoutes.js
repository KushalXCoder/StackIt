const express = require("express");

const getQuestions = require("../controllers/guest/getQuestions");
const getAnswerToQuestion = require("../controllers/guest/getAnswerToQuestion");
const getCommentToAnswer = require("../controllers/guest/getCommentToAnswer");
const searchQuestionByTag = require("../controllers/guest/searchQuestionByTag");
const filterQuestionsByTags = require('../controllers/guest/filterQuestionsByTags');

const guestRouter = express.Router();

guestRouter.get("/questions", getQuestions);

guestRouter.get("/questions/:questionId/answers", getAnswerToQuestion);

guestRouter.get("/answers/:answerId/comments", getCommentToAnswer);

guestRouter.get("/search", searchQuestionByTag);

guestRouter.get("/filter", filterQuestionsByTags);

module.exports = guestRouter;