// ---------------- QUIZ START --------------------//
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


// -------------- COUNTDOWN CLOCK ------------------- //
document.addEventListener("DOMContentLoaded", () => {
    const timeLeftDisplay = document.querySelector("#time-left");
  
    setInterval(function () {
      if (timeLeft <= 0) {
        return getNewQuestion();
      }
  
      timeLeftDisplay.innerHTML = timeLeft;
      timeLeft -= 1;
    }, 1000);
});
  
  let currentQuestion = {};
  let acceptingAnswers = true;
  let score = 0;
  let timeLeft = 30;
  let questionCounter = 0;
  let availableQuestions = [];

// ------------------- QUESTIONS -------------------- //

let questions = [
    {
        question: 'What force from the Sun pulls on Earth to keep it in orbit?',
        choice1: 'Friction',
        choice2: 'Gravity',
        choice3: 'Balance',
        choice4: 'Magnetic',
        answer: 2,
    },
    {
        question: "What do we call the layer of gas that blocks the Sun’s harmful rays?",
        choice1: 'A Thin Layer',
        choice2: 'The Oxygen Layer',
        choice3: 'The Ozone Layer',
        choice4: 'The Carbon Layer',
        answer: 3,
    },
    {
        question: "How long does it take Earth to rotate once on its axis?",
        choice1: '24 hours',
        choice2: 'A month',
        choice3: '1 hour',
        choice4: '1 year',
        answer: 1,
    },
    {
        question: "What is the word for melted rock deep inside the earth?",
        choice1: 'Cement',
        choice2: 'Magma',
        choice3: 'Pumice',
        choice4: 'Soil',
        answer: 2,
    },
    {
        question: "What do we call deep holes in the moon?",
        choice1: 'Boulders',
        choice2: 'Pits',
        choice3: 'Craters',
        choice4: 'Mountains',
        answer: 3,
    },
];

const SCORE_POINTS = 20;
const MAX_QUESTIONS = 5;

// --------------- START GAME FUNCTION ------------------- //
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion();
};

// --------------- CYCLE TO NEXT QUESTION AFTER ANSWER ------------- //
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../pages/end.html');
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        } else {
            timeLeft-=10;
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// ------------ INCREASE SCORE AFTER EACH CORRECT ANSWER ------------ //
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();

// ------------ PSEUDO CODE -------------- //
// 1. Build a quiz that starts when you click PLAY button
