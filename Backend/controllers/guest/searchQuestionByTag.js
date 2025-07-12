const Question = require('../../Schemas/question.schema');

async function searchQuestionByTag(req, res) {
    try {
        const query = req.query.tag; // Get the tag from query parameters
        if (!query) {
            return res.status(400).json({
                status: "error",
                message: "Tag query parameter is required",
            });
        }

        // Search for questions with matching tags
        const questions = await Question.find({
            tags: { $regex: query, $options: "i" }, // Case-insensitive search
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