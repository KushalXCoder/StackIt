const User = require('../../Schemas/user.schema');
const Answer = require('../../Schemas/answer.schema');
const Question = require('../../Schemas/question.schema');

async function acceptAnswer(req, res) {
    try {
        const userId = req.user._id;
        const { questionId, answerId } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                status: "question-not-found",
                error: "No question found for given id"
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