const Users = require("../../Schemas/user.schema");
const brcypt = require("bcrypt");
const encrypt = require("../../Utils/encrypt");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function handleLogin(req, res) {
	try {
		if (!req.body) {
			res.status(404).json({
				status: "error",
				data: "Missing request body",
			});
			return;
		}

		const { username, password } = req.body;
		if (!username || !password) {
			res.status(404).json({
				status: "error",
				data: "Missing username or password",
			});
			return;
		}

		const user = await Users.findOne({ username });
		if (!user) {
			res.status(401).json({
				status: "error",
				data: "Invalid username or password",
			});
			return;
		}
		const correctPassword = await brcypt.compare(password, user.password);
		if (!correctPassword) {
			res.status(401).json({
				status: "error",
				data: "Invalid username or password",
			});
			return;
		}

		const token = encrypt({
			userId: user._id.toString(),
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days exp
			role: user.role,
		});

		res.cookie("user-data", token);

		res.status(200).json({
			status: "success",
			data: {
				role: user.role,
			},
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}:`, error);
		res.status(500).json({
			status: "error",
			data: "Unknown error occurred",
		});
	}
}

module.exports = handleLogin;
