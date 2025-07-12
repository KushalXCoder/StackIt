const Answer = require('../../Schemas/answer.schema');
const Comment = require('../../Schemas/comment.schema');

async function getCommentToAnswer(req, res) {
    try {
        const { answerId } = req.params;
        const comments = await Comment.find({ answerId: answerId });
        return res.status(200).json({
            status: "success",
            data: comments
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred"
        });
    }
}
module.exports = getCommentToAnswer;