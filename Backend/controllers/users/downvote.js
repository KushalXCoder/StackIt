const User = require('../../Schemas/user.schema');
const Answer = require('../../Schemas/answer.schema');


async function downvote(req, res) {
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

        const hasdownvoted = answer.downvotes.includes(userId);

        if (hasdownvoted) {
            answer.downvotes = answer.downvotes.filer(id => id.toString() !== userId);
        } else {
            answer.downvotes.push(userId);
            answer.upvotes = answer.upvotes.filter(id => id.toString !== userId);
        }

        await answer.save();

        return res.status(200).json({
            status: "success",
            data: {
                answerId: answer._id,
                downvotes: answer.downvotes.length,
                upvotes: answer.upvotes.length,
                userdownvoted: !hasdownvoted
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

module.exports = downvote;