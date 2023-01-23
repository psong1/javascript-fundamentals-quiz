let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#time");
let choicesEl = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit");
let startBtn = document.querySelector("#start");
let initialsEl = document.querySelector("#initials");
let feedbackEl = document.querySelector("#feedback");

let questions = [
  {
      title: 'How many day are there in a year?',
      choices: ['24', '365', '52', '12'],
      answer: '365'
  },

  {
      title: 'What is the capital of Georgia?',
      choices: ['Atlanta', 'Macon', 'Miami', 'Seattle'],
      answer: 'Atlanta'
  },

  {
      title: 'test question',
      choices: ['a', 'b', 'c', 'd'],
      answer: 'a' 
  }
]

// quiz state variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;
let score = 0;

function startQuiz() {
  // hide start screen
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  let currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
    score++;
  }

  // flash right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;
  // change time to correct answers

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    endQuiz();
  }
}

function saveHighscore() {
  // get value of input box
  let initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    let newScore = {
      score: score,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscore.html";
    // document.getElementById('end-screen').style.display='none';
    // document.getElementById('scores-page').style.display='block';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

// let highScorePage = document.getElementById('scores-page');
// highScorePage.addEventListener('click', printHighscores());

//   function printHighscores() {
// // either get scores from localstorage or set to empty array
//   let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
// // sort highscores by score property in descending order
//   highscores.sort(function(a, b) {
//     return b.score - a.score;
//   });
      
//   highscores.forEach(function(score) {
// // create li tag for each high score
//     let liTag = document.createElement("li");
//     liTag.textContent = score.initials + " - " + score.score;
  
// // display on page
//     let olEl = document.getElementById("highscores");
//     olEl.appendChild(liTag);
//    });
//   }
  
//   function clearHighscores() {
//     window.localStorage.removeItem("scores");
//     window.location.reload();
//   }
  
//  // clears highscores
//   let clearScores = document.getElementById("clear");
//   clearScores.addEventListener('click', clearHighscores());

// // run function when page loads
// printHighscores();

