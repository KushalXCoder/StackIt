// @ts-check

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function checkLoggedIn(req, res) {
	try {
		return res.status(200).json({
			status: "success",
			data: "Logged In",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: ${error}`);
		return res.status(500).json({
			status: "error",
			data: "Unknown error occurred",
		});
	}
}

module.exports = checkLoggedIn;
