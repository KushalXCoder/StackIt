// @ts-check

const Question = require("../../Schemas/question.schema");
const Users = require("../../Schemas/user.schema");

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function handleDelete(req, res) {
    try {
        if (!req.body) {
            return res.status(404).json({
                status: 'error',
                data: 'Request body missing!'
            });
        }

        const validActions = [
            "QUESTION",
            "ANSWER",
            "COMMENT"
        ];

        const { action, questionId, answerId, commentId } = req.body;

        if (!action || typeof action !== 'string') {
            return res.status(404).json({
                status: "error",
                data: "Missing action"
            });
        }

        if (!validActions.includes(action.toUpperCase())) {
            return res.status(400).json({
                status: 'error',
                data: "Invalid Action"
            });
        }

        if (action.toUpperCase() === validActions[0] && (!questionId || typeof questionId !== "string")) {
            return res.status(404).json({
                status: "error",
                data: "questionId missing",
            });
        }

        if (action.toUpperCase() === validActions[1] && (!answerId || typeof answerId !== "string")) {
            return res.status(404).json({
                status: "error",
                data: "answerId missing",
            });
        }

        if (action.toUpperCase() === validActions[2] && (!commentId || typeof commentId !== "string")) {
            return res.status(404).json({
                status: "error",
                data: "commentId missing",
            });
        }

        if (action.toUpperCase() === validActions[0]) {
            // delete a question
            const deletedQuestion = await Question.findByIdAndDelete(questionId);
            Users.findByIdAndDelete
            if (deletedQuestion.)
        }
    } catch (error) {
        console.error(`Error in ${req.originalUrl}: $error`);
        return res.status(500).json({
            status: "error",
            data: "Unknown Error Occurred",
        });
    }
}

module.exports = handleDelete;