const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const redisClient = require("./utils/redisClient");

const app = express();

// Middleware
app.use(express.json());

app.use("/api", require("./routes/quizRoutes"));

const PORT = process.env.port || 3000;

// MongoDB Connection and App start
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log("[Database] : Connected"))
  .catch((err) => console.log("[Database]: Not Connected: ", err))
  .then(() => {
    // Start the server once MongoDB and Redis are connected
    app.listen(PORT, () => console.log(`[Server]: Running on port ${PORT}`));
  });
