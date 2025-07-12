const Question = require('../../Schemas/question.schema');

async function getQuestions(req, res) {
    try {
        const questions = await Question.find();
        return res.status(200).json({
            status: "success",
            data: questions
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred"
        });
    }
}

module.exports = getQuestions;