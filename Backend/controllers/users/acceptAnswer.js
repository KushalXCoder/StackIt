const User = require('../../Schemas/user.schema');
const Answer = require('../../Schemas/answer.schema');
const Question = require('../../Schemas/question.schema');

async function acceptAnswer(req, res) {
    try {
        const userId = req.user._id;
        const { questionId, answerId } = req.body;
        
        if (!questionId || !answerId) {
            return res.status(400).json({
                status: "bad-request",
                error: "questionId and answerId are required",
            });
        }
        
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                status: "question-not-found",
                error: "No question found for given id"
            });
        }

        if (question.askedBy.toString() !== userId.toString()) {
            return res.status(403).json({
                status: "unauthorized",
                error: "You are not authorized to accept the answer"
            });
        }

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({
                status: "answer-not-found",
                error: "No answer found for given id"
            });
        }
        if (answer.questionId.toString() !== questionId.toString()) {
            return res.status(404).json({
                status: "answer-not-found",
                error: "No answer found for given question with given id"
            });
        }

        question.acceptedAnswer = answerId;

        await question.save();
        
        return res.status(200).json({
            status: "success",
            data: question
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred",
        });
    }
}

module.export = acceptAnswer;