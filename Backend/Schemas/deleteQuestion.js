const Question = require('../../Schemas/question.schema');

async function deleteQuestion(req, res) {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                status: "not-found",
                error: "Question not found"
            });
        }

        if (question.askedBy.toString() !== userId.toString()) {
            return res.status(403).json({
                status: "unathorized",
                error: "You are not authorized to delete the question"
            });
        }
        await Question.findByIdAndDelete(quesitonId);

        return res.status(200).json({
            status: "success",
            message: "Question deleted successfully"
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred",
        });
    }
}

module.exports = deleteQuestion;