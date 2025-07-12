const User = require('../../Schemas/user.schema');
const Answer = require('../../Schemas/answer.schema');


async function upvote(req, res) {
    try {
        const { answerId } = req.body;

        const userId = req.user._id;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({
                status: "error",
                data: "Answer not found"
            });
        }

        const hasUpvoted = answer.upvotes.includes(userId);

        if (hasUpvoted) {
            answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId);
        } else {
            answer.upvotes.push(userId);
            answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId);
        }

        await answer.save();

        return res.status(200).json({
            status: "success",
            data: {
                answerId: answer._id,
                upvotes: answer.upvotes.length,
                downvotes: answer.downvotes.length,
                userUpvoted: !hasUpvoted
            }
        });

    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred"
        });
    }
}

module.exports = upvote;