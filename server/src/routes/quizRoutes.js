const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require("dotenv").config();
const {
    helloworld,
    addQuiz,
    getQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    check
  } = require('../controllers/quizControllers');

//Middleware
router.use(
    cors({
        credentials: true,
        origin: process.env.DOMAIN
    })
)

router.get('/hello', helloworld);
router.post('/addQuiz', addQuiz);
router.post('/getQuiz', getQuiz);
router.get('/getAllQuizzes', getAllQuizzes);
router.post('/updateQuiz', updateQuiz);
router.post('/deleteQuiz', deleteQuiz);

router.post('/check', check);

module.exports = router