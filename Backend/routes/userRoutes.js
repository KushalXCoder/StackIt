const express = require("express");
const createQuestion = require("../controllers/users/createQuestion.controller");

const userRouter = express.Router();

userRouter.put("/create/question", createQuestion);

module.exports = userRouter;
