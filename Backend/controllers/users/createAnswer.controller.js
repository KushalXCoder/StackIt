// @ts-check

const Answer = require("../../Schemas/answer.schema");
const Notification = require("../../Schemas/notification.schema");
const Question = require("../../Schemas/question.schema");
const User = require("../../Schemas/user.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createAnswer(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Could not find request body",
			});
		}

		const { questionId, content, mentions, images } = req.body;

		if (
			!questionId ||
			typeof questionId !== "string" ||
			!content ||
			typeof content !== "string" ||
			!mentions ||
			!Array.isArray(mentions) ||
			mentions.some((ele) => typeof ele !== "string") ||
			!Array.isArray(images) ||
			images.some((ele) => typeof ele !== "string")
		) {
			return res.status(400).json({
				status: "error",
				data: "Invalid request",
			});
		}

		const question = await Question.findById(questionId);
		if (!question) {
			return res.status(404).json({
				status: "error",
				data: "No question found with given id",
			});
		}

		const createdAnswer = await Answer.insertOne({
			content,
			// @ts-ignore
			answeredBy: req.user._id,
			questionId,
			mentions,
			imagesUrl: images,
		});

		const notifications = [];

		for (let mention of mentions) {
			const userExists = await User.findById(mention);
			if (userExists) {
				notifications.push({
					userId: mention,
					content: `${mention} has mentioned you in their answer!`,
					notificationType: "MentionedYou",
				});
			}
		}

		await Notification.insertMany([
			...notifications,
			{
				userId: question.askedBy,
				// @ts-ignore
				content: `${req.user._id} just answered your question!`,
				notificationType: "AnsweredYourQuestion",
				questionId,
			},
		]);

		if (!createdAnswer) {
			return res.status(500).json({
				status: "error",
				data: "Failed to create a new answer",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Added a new answer",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = createAnswer;
