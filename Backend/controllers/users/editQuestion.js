const Question = require('../../Schemas/question.schema')

async function editQuestion(req, res) {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;
        const { title, content, tags, imagesUrl } = req.body; // Fields to update

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                status: "not-found",
                error: "Question not found"
            });
        }

        if (question.askedBy.toString() !== userId.toString()) {
            return res.status(403).json({
                status: "unauthorized",
                error: "You are not authorized to edit the question"
            });
        }

        if (!title && !content && !tags && !imagesUrl) {
            return res.status(400).json({
                status: "bad-request",
                error: "No updates provided",
            });
        }

        question.title = title || question.title;
        question.content = content || question.content;
        question.tags = tags || question.tags;
        question.imagesUrl = imagesUrl || question.imagesUrl;

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

module.exports = editQuestion;
