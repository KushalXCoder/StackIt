const express = require("express");
const createQuestion = require("../controllers/users/createQuestion.controller");
const createAnswer = require("../controllers/users/createAnswer.controller");
const createComment = require("../controllers/users/createComment.controller");

const userRouter = express.Router();

userRouter.put("/create/question", createQuestion);
userRouter.put("/create/answer", createAnswer);
userRouter.put("/create/comment", createComment);

module.exports = userRouter;
