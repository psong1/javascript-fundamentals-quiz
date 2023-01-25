'use strict';

let questionBlockEl = document.querySelector('#questionBlock');
let timerEl = document.querySelector('#time');
let optionsEl = document.querySelector('#options');
let submitBtn = document.querySelector('#submit');
let startBtn = document.querySelector('#start');
let initialsEl = document.querySelector('#initials');
let feedbackEl = document.querySelector('#feedback');

let questionsArr = [
  {
    question: 'What are template literal enclosed with?',
    options: ['parentheses', 'backticks', 'brackets', 'semi-colons'],
    answer: 'backticks'
  },

  {
    question: 'Which of the following are logical operators?',
    options: ['&& and', '|| or', '! not', 'All of the above'],
    answer: 'All of the above'
  },

  {
    question: 'True or False: The z-index indicates how far back or how far forward an element appears on the page.',
    options: ['True', 'False',],
    answer: 'True' 
  },

  {
    question: 'Which of the following is not a property of the box model?',
    options: ['margin', 'float', 'padding', 'border'],
    answer: 'float'
  },

  {
    question: 'Which type of breadcrumb trail is the following example: "Pineapple: Yellow Large"',
    options: ['Path-based', 'Attribute-based', 'URL-based', 'Location-based'],
    answer: 'Attribute-based'
  },

  {
    question: 'What method is used to help debug code in Javascript?',
    options: ['Math.random()', 'Array.prototype.push()', 'console.log()', 'Math.floor()'],
    answer: 'console.log()'
  },

  {
    question: 'True or False: the "!important" flag will override any style.',
    options: ['True', 'False'],
    answer: 'True'
  },

  {
    question: 'Arrays in Javascript can be used to store:',
    options: ['Numbers and strings', 'Booleans', 'Other arrays', 'All of the above'],
    answer: 'All of the above'
  },
]

// start on first question, which is 0 in the array,
// have a fresh score of 0, and state the timer/time variable
let currentQuestionIndex = 0;
let time = questionsArr.length * 10;
let timerId;
let score = 0;

// begins quiz by hiding the start screen, removing "hide" class from questions
// id, and starting the timer based on the number of questions
function startQuiz() {
  let startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  questionBlockEl.removeAttribute('class');

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

startBtn.addEventListener('click', startQuiz);

// gets the first question from the array, creates buttons for the options,
// and appends them on the page
function getQuestion() {
  let currentQuestion = questionsArr[currentQuestionIndex];

  let questionEl = document.getElementById('question');
  questionEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(function(option, i) {
    let optionNode = document.createElement('button');
    optionNode.setAttribute('class', 'options');
    optionNode.style.fontSize = '32px';
    optionNode.setAttribute('value', option);

    optionNode.addEventListener('click', questionClick);

    optionNode.textContent = i + 1 + ". " + option;
    optionsEl.appendChild(optionNode);
   
  });
}

// checks for correct answer on optionNode click and provides feedback to user
// if user is wrong, deduct five seconds and show "Wrong!"
// if user is correct, add one point to the score and show "Correct!"
// then next question in the array is called
// if there are no more questions in the array, 
function questionClick() {
  if (this.value !== questionsArr[currentQuestionIndex].answer) {
    time -= 5;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
    feedbackEl.style.color = 'red';
    feedbackEl.style.fontSize = '42px';
  } else {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.style.color = 'green';
    feedbackEl.style.fontSize = '42px';
    score++;
  }

  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function() {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questionsArr.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

// stops the timer, and shows the end-screen and final score
// add the hide class to remove questions
function endQuiz() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = score;

  questionBlockEl.setAttribute('class', 'hide');
}
// updates the timer and counts down 1s at a time
// if timer reaches 0s, the final screen is shown
function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

// saves initials and removes extra space, and gets scores from local storage
// if there are no saved scores, save new score to local storage
// then redirects to html with scores
function saveHighscore() {
  let initials = initialsEl.value.trim();

  if (initials !== "") {
    let highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    let newScore = {
      score: score,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscore.html';
  }
}

submitBtn.addEventListener('click', saveHighscore);

function Enter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

initialsEl.onkeyup = Enter;



