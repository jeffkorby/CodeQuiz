var startScreen = document.getElementById("startScreen");
var startButton = document.getElementById("startButton");
var gameSpot = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var timerEl = document.getElementById("timer");
var timeRemaining = document.getElementById("timeRemaining");
var highscores = document.getElementById("highscores");
var results = document.getElementById("results");
var score = document.getElementById("playerScore");
var playAgain = document.getElementById("playAgain");

    const quizQuestions = [
        {
          question: "Commonly used data types DO NOT include:",
          answers: {
              a: "strings",
              b: "booleans",
              c: "alerts",
              d: "numbers"
          },   
          correctAnswer: "c"
        },
        {
          question: "The condition in an if / else statement is enclosed within ____.",
          answers: {
              a: "quotes",
              b: "curly brackets",
              c: "parentheses",
              d: "square brackets"
          },    
          correctAnswer: "c"
        },
        {
          question: "Arrays in JavaScript can be used to store ____.",
          answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
        },    
        correctAnswer: "d"
        },
        {
          question:
            "String values must be enclosed within ____ when being assigned to variables.",
          answers: {
              a: "commas",
              b: "curly brackets",
              c: "quotes",
              d: "parentheses"
          },
          correctAnswer: "c"
        },
        {
          question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
          answers: {
              a: "JavaScript",
              b: "terminal / bash",
              c: "for loops",
              d: "console.log"
          },
          correctAnswer: "d"
        }
      ];
      

var playerScore;
var questionNumber;
var timeremaining;
var points;
var setTimeInterval;
var scoreTimerInterval;

var highScoreString = localStorage.getItem("highscoresLS");
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[9]?.playerScore ?? 0;

startButton.addEventListener("click", function () {buildQuiz()});
playAgain.addEventListener("click", function() {buildQuiz()});

answer1.addEventListener("click", function () {answerChecker("a")});
answer2.addEventListener("click", function () {answerChecker("b")});
answer3.addEventListener("click", function () {answerChecker("c")});
answer4.addEventListener("click", function () {answerChecker("d")});

function buildQuiz() {
    questionNumber = -1;
    timeremaining = 60;
    points = 1000;
    playerScore = 0;

    startScreen.style.display = "none";
    results.style.display = "none";
    gameSpot.style.display = "flex";

    timeRemaining.textContent = timeremaining;

    setTimeInterval = setInterval(setTime, 1000);

    scoreTimerInterval = setInterval(scoreTimer, 10);

    nextQuestion();
}

function scoreTimer () {
    if (points > 0) {
        points -= 1;
    };
};

function setTime() {
    if (timeremaining > 0) {
        timeremaining--;
        timeRemaining.textContent = timeremaining;
    } else {
        showResults();
    };
};

function nextQuestion () {
    questionNumber++;

    if (questionNumber < quizQuestions.length) {
        questionEl.textContent = quizQuestions[questionNumber].question;
        answer1.textContent = quizQuestions[questionNumber].answers.a;
        answer2.textContent = quizQuestions[questionNumber].answers.b;
        answer3.textContent = quizQuestions[questionNumber].answers.c;
        answer4.textContent = quizQuestions[questionNumber].answers.d;
    } else {
        showResults();
    };
};

function answerChecker (x) {
    if (x == quizQuestions[questionNumber].correctAnswer) {
        playerScore += points;
        points = 500
        nextQuestion();
    };
};

function showResults() {
    gameSpot.style.display = "none";
    results.style.display = "flex";

    clearInterval(setTimeInterval);
    clearInterval(scoreTimerInterval);

    score.textContent = playerScore;
    
    scoreChecker();
};    

function scoreChecker() {
    if (playerScore > lowestScore) {
        submitHighscore();
    };
}

function submitHighscore() {
    var initials = prompt("Enter your initials to save your high score:");
    var newScore = {playerScore, initials};

    highScores.push(newScore);
    highScores.sort((a, b) => b.playerScore - a.playerScore);
    highScores.splice(10);
    localStorage.setItem("highscoresLS", JSON.stringify(highScores));
} 


