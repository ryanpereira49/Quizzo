const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  oid: {
    type: String,
    required: true
  },
  otext: {
    type: String,
    required: true
  }
});

const QuestionSchema = new Schema({
  qid: {
    type: String,
    required: true
  },
  qtext: {
    type: String,
    required: true
  },
  options: [OptionSchema]
});

const AnswerSchema = new Schema({
  qid: {
    type: String,
    required: true
  },
  oid: {
    type: String,
    required: true
  }
});

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [QuestionSchema],
  answers: [AnswerSchema]
});

module.exports = mongoose.model('Quiz', QuizSchema);