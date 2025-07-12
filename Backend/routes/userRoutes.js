const express = require("express");
const createQuestion = require("../controllers/users/createQuestion.controller");
const createAnswer = require("../controllers/users/createAnswer.controller");
const createComment = require("../controllers/users/createComment.controller");
const editAnswer = require("../controllers/users/editAnswer.controller");
const editComment = require("../controllers/users/editComment.controller");
const editQuestion = require("../controllers/users/editQuestion");
const upvote = require("../controllers/users/upvote");
const getNotifications = require("../controllers/users/getNotification");
const downvote = require("../controllers/users/downvote");

const userRouter = express.Router();

userRouter.put("/create/question", createQuestion);
userRouter.put("/create/answer", createAnswer);
userRouter.put("/create/comment", createComment);
userRouter.patch("/edit/question", editQuestion);
userRouter.patch("/edit/answer", editAnswer);
userRouter.patch("/edit/comment", editComment);
userRouter.put("/upvote", upvote);
userRouter.put("/downvote", downvote);
userRouter.get("/notifications", getNotifications);

module.exports = userRouter;
