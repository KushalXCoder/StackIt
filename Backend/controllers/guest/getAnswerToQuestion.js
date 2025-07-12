const Question = require('../../Schemas/question.schema');
const Answer = require('../../Schemas/answer.schema');

/*
    takes questionId as param
    returns a json of answers for the given question
*/
async function getAnswerToQuestion(req, res) {
    try {
        const { questionId } = req.params;
        const answers = await Answer.find({ question: questionId });
        return res.status(200).json({
            status: "success",
            data: answers
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred"
        });
    }
}

module.exports = getAnswerToQuestion;