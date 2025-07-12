function checkEnv() {
	return (
		process.env.MONGODB_URI &&
		process.env.CLOUDINARY_CLOUD_NAME &&
		process.env.CLOUDINARY_API_KEY &&
		process.env.CLOUDINARY_API_SECRET &&
		process.env.REDIS_USERNAME &&
		process.env.REDIS_PASSWORD &&
		process.env.REDIS_HOST &&
		process.env.REDIS_PORT &&
		process.env.PORT &&
		process.env.ENCRYPTION_KEY &&
		process.env.IV_LENGTH &&
		process.env.SALT_ROUNDS
	);
}

module.exports = checkEnv;
