const Question = require('../../Schemas/question.schema');

async function filterQuestionsByTags(req, res) {
    try {
        const tags = req.query.tags; // Get tags from query parameters
        if (!tags) {
            return res.status(400).json({
                status: "error",
                message: "Tags query parameter is required",
            });
        }

        const tagsArray = tags.split(","); // Split tags into an array
        const questions = await Question.find({
            tags: { $in: tagsArray }, // Match any of the tags
        });

        if (questions.length === 0) {
            return res.status(404).json({
                status: "not-found",
                message: "No questions found for the given tags",
            });
        }

        return res.status(200).json({
            status: "success",
            data: questions,
        });
    } catch (error) {
        console.error("Error filtering questions by tags:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

module.exports = filterQuestionsByTags;