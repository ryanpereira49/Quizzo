const { response } = require("express");
const Quiz = require("../models/Quiz");
const redisClient = require("../utils/redisClient");

const helloworld = async (req, res) => {
  res.json({message:"Hello World!"})
};

const addQuiz = async (req, res) => {
  const quizData = req.body;
  try {
    const quiz = new Quiz(quizData);
    const savedQuiz = await quiz.save();
    res.json({ success: savedQuiz });
  } catch (error) {
    console.error("Error adding quiz:", error);
    res.status(500).json({ error: "Failed to add quiz" });
  }
};

const getQuiz = async (req, res) => {
  const { quizId } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ Error: "Quiz not Found" });
    }
  } catch (error) {
    console.error("Error retrieving quiz:", error);
    res.status(500).json({ error: "Failed to retrieve quiz" });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("Error retrieving quizzes:", error);
    res.status(500).json({ error: "Failed to retrieve quizzes" });
  }
};

const updateQuiz = async (req, res) => {
  const { quizId, ...updateData } = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
    if (updatedQuiz) {
      res.json({ success: updatedQuiz });
    } else {
      res.status(404).json({ Error: "Quiz not Found" });
    }
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

const deleteQuiz = async (req, res) => {
  const { quizId } = req.body;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (deletedQuiz) {
      res.json({ message: "Quiz deleted successfully" });
    } else {
      res.status(404).json({ Error: "Quiz not Found" });
    }
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

const check = async (req, res) => {
  const { option, quizId, index } = req.body;

  // Validate request body
  if (!option || !quizId || index === undefined) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    //Check if quiz exists in Redis cache
    const cachedQuiz = await redisClient.get(`quiz:${quizId}`);

    let quiz;

    if (cachedQuiz) {
      //If quiz found in cache, parse it
      quiz = JSON.parse(cachedQuiz);
    } else {
      //If quiz not found in cache, fetch from database
      quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      // Store the quiz in Redis with 30-minute expiration
      await redisClient.set(`quiz:${quizId}`, JSON.stringify(quiz), {
        EX: 1800, // Expiry set to 1800 seconds (30 minutes)
      });
    }

    // Validate answer
    if (quiz) {
      if (quiz.answers[index].oid == option) {
        res.json({ message: "correct", answer: quiz.answers[index].oid });
      } else {
        res.json({ message: "wrong", answer: quiz.answers[index].oid });
      }
    } else {
      res.status(404).json({ Error: "Quiz not Found" });
    }
  } catch (error) {
    console.error("Error retrieving quiz:", error);
    res.status(500).json({ error: "Failed to retrieve quiz" });
  }
};

module.exports = {
  helloworld,
  addQuiz,
  getQuiz,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  check,
};
