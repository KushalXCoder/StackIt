const mongoose = require("mongoose");

async function initMongoDB() {
	await mongoose.connect(process.env.MONGODB_URI).then(
		(data) => console.log("Connected to MongDB:", data.connection.db.databaseName),
		(data) => console.log("Failed to connect to MongoDB:", data)
	);
}

module.exports = initMongoDB;
