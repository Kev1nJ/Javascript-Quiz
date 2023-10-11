const questions = [
  {
    question: "What is the syntax for declaring a variable in JavaScript?",
    answers: [
      { text: "var x;", correct: false },
      { text: "variable x;", correct: false },
      { text: "let x;", correct: true },
      { text: "x = 5;", correct: false },
    ],
  },
  {
    question: "Which keyword is used to define a function in JavaScript?",
    answers: [
      { text: "function", correct: true },
      { text: "def", correct: false },
      { text: "fun", correct: false },
      { text: "method", correct: false },
    ],
  },
  {
    question: "What is the result of 10 + '5' in JavaScript?",
    answers: [
      { text: "15", correct: false },
      { text: "105", correct: true },
      { text: "Error", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question: "How do you create a pop-up dialog box (alert) in JavaScript?",
  answers: [
    { text: "msgBox('Hello World');", correct: false },
    { text: "prompt('Hello World');", correct: false },
    { text: "alert('Hello World');", correct: true },
    { text: "confirm('Hello World');", correct: false },
  ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-button");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let quizStarted = false;
let gameEnded = false;

startButton.addEventListener("click", () => {
  if (!quizStarted && !gameEnded) {
    startQuiz();
    quizStarted = true;
  }
});

nextButton.addEventListener("click", () => {
  if (!quizStarted || gameEnded) return;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  startButton.style.display = "none";
  // Start the timer here
  timer = setInterval(updateTimer, 1000);
}

function showQuestion() {
  resetState();
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);

      button.addEventListener("click", () => selectAnswer(index, answer.correct));
    });
  } else {
    endGame();
  }
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.style.display = "none";
}

function selectAnswer(selectedIndex, isCorrect) {
  if (!quizStarted || gameEnded) return;

  const buttons = answerButtons.children;

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const answer = questions[currentQuestionIndex].answers[i];

    if (i === selectedIndex) {
      if (isCorrect) {
        button.classList.add("correct");
        score++;
      } else {
        button.classList.add("incorrect");
        
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
      }
    } else if (answer.correct) {
      button.classList.add("correct");
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.textContent = `Timer: ${timeLeft} seconds`;
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(timer);
  timerDisplay.textContent = "Game Over";
  quizStarted = false;
  gameEnded = true;
  answerButtons.innerHTML = "";


  questionElement.textContent = `Your Score: ${score}`;

}
