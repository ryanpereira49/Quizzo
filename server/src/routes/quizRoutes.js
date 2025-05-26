const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require("dotenv").config();
const rateLimit = require('express-rate-limit');
const {
    helloworld,
    addQuiz,
    getQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    check,
    generateQuiz
  } = require('../controllers/quizControllers');

//Middleware
router.use(
    cors({
        credentials: true,
        origin: process.env.DOMAIN
    })
)

const quizGeneratorLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes (time frame for which requests are counted)
  max: 15, // Limit each IP to 5 requests per `windowMs`
  message:
    "Too many quiz generation requests from this IP, please try again after 15 minutes.",
  statusCode: 429, // Optional: custom status code for response
  headers: true, // Optional: add X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers
});

router.get('/hello', helloworld);
router.post('/addQuiz', addQuiz);
router.post('/getQuiz', getQuiz);
router.get('/getAllQuizzes', getAllQuizzes);
router.post('/updateQuiz', updateQuiz);
router.post('/deleteQuiz', deleteQuiz);

router.post('/check', check);

router.post('/generateQuiz',quizGeneratorLimiter, generateQuiz)

module.exports = router