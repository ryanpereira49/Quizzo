// Validate quiz JSON structure
function validateQuizStructure(quiz)  {
  const requiredFields = ['title', 'description', 'questions', 'answers', 'explanations'];
  
  for (const field of requiredFields) {
    if (!quiz[field]) {
      return `Missing required field: ${field}`;
    }
  }
  
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return 'Questions must be a non-empty array';
  }
  
  if (!Array.isArray(quiz.answers) || quiz.answers.length !== quiz.questions.length) {
    return 'Answers array must match questions array length';
  }
  
  if (!Array.isArray(quiz.explanations) || quiz.explanations.length !== quiz.questions.length) {
    return 'Explanations array must match questions array length';
  }

  return null
}

module.exports = validateQuizStructure