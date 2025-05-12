const { createClient } = require("redis");
const dotenv = require("dotenv").config();

// Create and export the Redis client instance
const redisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Connect to Redis
redisClient.connect().then(() => {
  console.log("[Redis] : Connected");
}).catch((err) => {
  console.log("[Redis]: Not Connected: ", err);
});

module.exports = redisClient;
