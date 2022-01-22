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
        question: 'What is the busiest U.S. airport (based on passenger enplanements) ?',
        choice1: 'Dallas/Fort Worth',
        choice2: 'Atlanta - Hartsfield',
        choice3: 'Chicago - Ohare',
        choice4: 'Denver International',
        answer: 2,
    },
    {
        question: "What year did Orville and Wilbur Wright fly the first successful airplane?",
        choice1: '1913',
        choice2: '1898',
        choice3: '1903',
        choice4: '1929',
        answer: 3,
    },
    {
        question: "During take-off, the Boeing 767 sucks in enough air to fill the Goodyear Blimp in ____ seconds:",
        choice1: '7 seconds',
        choice2: '11 seconds',
        choice3: '15 seconds',
        choice4: '5 seconds',
        answer: 1,
    },
    {
        question: "What is the longest non-stop flight in the world today?",
        choice1: 'Perth -> London',
        choice2: 'Singapore -> New York',
        choice3: 'Aukland -> Dubai',
        choice4: 'Houston -> Sydney',
        answer: 2,
    },
    {
        question: "What is the oldest airline in the world still flying today?",
        choice1: 'Qantas',
        choice2: 'Delta',
        choice3: 'KLM Royal Dutch',
        choice4: 'American',
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
    if(availableQuestions.length === 0 || timeLeft === 0 || questionCounter > MAX_QUESTIONS) {
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

// 1. Build  a home screen with a start button and view high scores button (optional)
// 2. Create an event listener for the start button
    // 2.1 onCick of the start button, 2 things happen
        // 1. The timer starts and be displayeed
        // 2. The first question is displayed with the answer choices
// 3. Create an event listener for the answer choices
     //3.1 onClick of an answer choice
            // 1. indicate somehow that the answer is right or wrong
            // 2. THEN go to the next question
    // 3.2 If we are creating these elements with the DOM in javascript, create a reusable function for creating the elements for the question and answers. 
    // 3.3. We'll probably need a variable/array/object to store questions and correct answer.
// 4. If the timer hits 0 OR the user gets through all the questions, we want to go to the highscore page
    // 4.1 An input field where the user can type in their high score
    // 4.2 Store the high score in Local Storage (HINT: JSON.stringify())
    // 4.3 Retrieve the high scores from local storage for that user
    //4.4 Display the user's high scores
// 5. Subtract time from the timer if the answer is wrong 
    // 5.1 Timer should be displayed while the questions/answers change
    // 5.2 how to create a countdown in javascript - what will we need