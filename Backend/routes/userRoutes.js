const express = require("express");
const createQuestion = require("../controllers/users/createQuestion.controller");
const createAnswer = require("../controllers/users/createAnswer.controller");
const createComment = require("../controllers/users/createComment.controller");
const editAnswer = require("../controllers/users/editAnswer.controller");
const editComment = require("../controllers/users/editComment.controller");

const userRouter = express.Router();

userRouter.put("/create/question", createQuestion);
userRouter.put("/create/answer", createAnswer);
userRouter.put("/create/comment", createComment);
userRouter.patch("/edit/answer", editAnswer);
userRouter.patch("/edit/comment", editComment);

module.exports = userRouter;
