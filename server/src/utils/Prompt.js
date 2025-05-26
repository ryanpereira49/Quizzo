export default function getPrompt(topic, quizLength, difficulty) {

    const difficultyGuide = `
The difficulty levels are defined as follows:

- Easy (Foundational):
  Audience: Beginners or casual learners with little to no prior knowledge.
  Focus: Straightforward facts, definitions, and basic recognition.
  Cognitive Load: Low – mostly recall-based questions.
  Examples: "What is the capital of France?", "Which gas do humans exhale?"
  Instruction: Generate questions on fundamental concepts, everyday facts, or straightforward definitions. Options should be clearly distinct and make the correct answer obvious to someone with basic familiarity.

- Medium (Intermediate):
  Audience: Learners with some background knowledge or moderate familiarity with the topic.
  Focus: Application of understanding, interpreting context, distinguishing between similar ideas.
  Cognitive Load: Moderate – recall and basic analysis.
  Examples: "Which organ is primarily responsible for detoxifying the blood?", "What distinguishes renewable from non-renewable resources?"
  Instruction: Create questions that require a solid understanding of the topic. Include plausible distractors that test comprehension and the ability to apply knowledge.

- Hard (Expert):
  Audience: Advanced learners or domain experts.
  Focus: Deep understanding, complex theories, edge cases, and critical thinking.
  Cognitive Load: High – analysis, synthesis, and evaluative reasoning.
  Examples: "Which mechanism best explains X under Y condition?", "Which of these is NOT a valid implication of Z theory?"
  Instruction: Develop questions that demand critical thinking and expert-level subject knowledge. Options should be equally plausible, making the correct choice non-trivial.
`;


  const prompt = `You are an expert quiz generator and educator.

Your task is to generate a multiple-choice quiz on the topic of **'${topic}'**, containing exactly **${quizLength}** questions at the **'${difficulty}'** difficulty level.

### Difficulty Guidelines:
${difficultyGuide}

### Formatting and Constraints:
- Return only a valid **JSON object** (no markdown or commentary).
- Each question object must have:
  - A unique \`qid\` (e.g., "q1", "q2", ..., sequentially).
  - A \`qtext\` field for the question.
  - An \`options\` array of **exactly 4 options**, each with:
    - A unique \`oid\` ("o1" to "o4", sequentially per question).
    - An \`otext\` string that is **concise—limited to 3 or 4 words maximum** (e.g., "Theory of Relativity", "Carbon Dioxide Emission", "Battle of Hastings").

**Keep each option short enough to fit inside a rectangular UI element. Avoid full sentences, excessive punctuation, or complex formatting.**

- The \`answers\` array must contain the correct \`oid\` for each question.
- The \`explanations\` array must include a detailed \`explanation_text\` for each question:
  - Explain **why** the correct option is correct.
  - Explain **why** the other three options are incorrect.
  - Refer to options using their **text** or labels like "Option A", not by their \`oid\`.

### Output JSON Format:
{
  "title": "Quiz on ${topic}",
  "description": "Welcome to your '${difficulty}' level quiz on '${topic}'! This quiz includes ${quizLength} questions designed to challenge and enhance your knowledge.",
  "questions": [
    {
      "qid": "q1",
      "qtext": "Example question?",
      "options": [
        {"oid": "o1", "otext": "Option A"},
        {"oid": "o2", "otext": "Option B"},
        {"oid": "o3", "otext": "Option C"},
        {"oid": "o4", "otext": "Option D"}
      ]
    }
    // ...more questions
  ],
  "answers": [
    {"qid": "q1", "oid": "oX"}
    // ...more answers
  ],
  "explanations": [
    {
      "qid": "q1",
      "explanation_text": "Detailed reasoning for the correct answer and why the others are incorrect."
    }
    // ...more explanations
  ]
}`;

  return prompt;
}
