const Question = require('../../Schemas/question.schema');

async function searchQuestionByTag(req, res) {
    try {
        const tags = req.query.tags; // Get the tag from query parameters
        if (!tags) {
            return res.status(400).json({
                status: "error",
                message: "Tag query parameter is required",
            });
        }

        const tagsArray = tags.split(",");
        const questions = await Question.find({
            tags: { $in: tagsArray }, // Case-insensitive search
        });

        if (questions.length === 0) {
            return res.status(404).json({
                status: "not-found",
                message: "No questions found for the given tag",
            });
        }

        return res.status(200).json({
            status: "success",
            data: questions,
        });
    } catch (error) {
        console.error("Error searching questions by tag:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

module.exports = searchQuestionByTag;