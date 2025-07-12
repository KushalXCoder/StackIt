const redis = require("redis");

async function initRedis() {
	const client = redis.createClient({
		username: process.env.REDIS_USERNAME,
		password: process.env.REDIS_PASSWORD,
		socket: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		},
	});

	client.on("connect", () => console.log("Connected to redis!"));
	client.on("error", (data) => {
		console.error("Could not connect to redis!", data);
		process.exit(0);
	});

	if (!client.isReady) {
		await client.connect();
	}
	return client;
}

module.exports = initRedis;
