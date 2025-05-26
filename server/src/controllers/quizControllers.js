const { response } = require("express");
const Quiz = require("../models/Quiz");
const redisClient = require("../utils/redisClient");
const axios = require('axios')
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { default: getPrompt } = require("../utils/Prompt");
const { default: validateQuizStructure } = require("../utils/validateQuiz");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


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
    const cachedQuiz = false//await redisClient.get(`quiz:${quizId}`);
    if (process.env.NODE_ENV !== 'development') {
      
    }

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
      
      // Run only in non-development enviornment
      if (process.env.NODE_ENV !== 'development') {
        // Store the quiz in Redis with 30-minute expiration
        await redisClient.set(`quiz:${quizId}`, JSON.stringify(quiz), {
          EX: 1800, // Expiry set to 1800 seconds (30 minutes)
        });
      }
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

const generateQuiz = async (req, res) => {
  let {topic, quizLength, difficulty} = req.body
  
  if (!topic || !quizLength || !difficulty) {
    return res.status(400).json({ message: 'Missing required fields: topic, quizLength, difficulty' });
  }

  // Sanitize inputs
  topic = topic.replace(/[<>\"'&]/g, '').trim();
  
  const prompt = getPrompt(topic, quizLength, difficulty)

  try{

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let quizData
     try {
     // Clean the text to ensure it's just JSON (remove ```json wrappers if present)
     const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
     quizData = JSON.parse(cleanedText);
   } catch (parseError) {
     console.error('Failed to parse Gemma JSON:', parseError);
     console.error('Gemma raw response:', text);
     return res.status(500).json({ message: 'AI generation error: Invalid JSON format.' });
   }

    const quizValidation = validateQuizStructure(quizData)

    if(quizValidation !== null){
      return res.status(400).json({ error: quizValidation });
    }

    const newQuiz = new Quiz(quizData)

    const savedQuiz = await newQuiz.save();
    

    return res.json({quizdata: quizData, id: savedQuiz._id})

  }catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
}

module.exports = {
  helloworld,
  addQuiz,
  getQuiz,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  check,
  generateQuiz,
};
