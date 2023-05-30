var currentQuestionIndex = 0; // Variable to keep track of the current question index
var time = 60;  // Initial time for the quiz
var timerId;  // Variable to store the timer interval ID

// DOM element variables
var questionsEl = document.getElementById('questions'); 
var timerEl = document.getElementById('timer'); 
var choicesEl = document.getElementById('choices'); 
var submitBtn = document.getElementById('submit');  
var startBtn = document.getElementById('start');  
var initialsEl = document.getElementById('initials'); 
var feedbackEl = document.getElementById('feedback'); 


function startQuiz() {
  // Function to start the quiz
  var startScreenEl = document.getElementById('start-screen'); // DOM element for the start screen
  
  startScreenEl.setAttribute('class', 'hide');  // Hide start screen

  questionsEl.removeAttribute('class'); // Show questions section

  timerId = setInterval(clockTick, 1000); // Start timer

  timerEl.textContent = time; // Show time

  getQuestion();  // Show the first question
}

function getQuestion() {
  // Function to retrieve and show question
  var currentQuestion = questions[currentQuestionIndex];  // Get current question object

  var titleEl = document.getElementById('question-title');  // DOM element for the question title
  titleEl.textContent = currentQuestion.title;  // Display the current question title

  choicesEl.innerHTML = ''; // Clear old question choices

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // Loop over the choices of the current question
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');  // Creates a button for each choice
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + ' . ' + choice; // Display the choice 

    choicesEl.appendChild(choiceNode);  // Display the choice button on the page
  }
}

function questionClick(event) {
  // Function to handle a click on a choice button
  var buttonEl = event.target;  // Gets the clicked button element

  if (!buttonEl.matches('.choice')) {
    // If the clicked element is not a choice button, no reponse
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // If answer is wrong 
    time -= 10; // Penalize time by decreasing it
    timerEl.textContent = time; // Update the time display
    feedbackEl.textContent = 'Wrong!';  // Wrong message feedback
  } else {
    feedbackEl.textContent = 'Correct!';  // Correct message feedback
  }
 
  feedbackEl.setAttribute('class', 'feedback'); // Show the feedback temporarily
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide'); // Hide the feedback 
  }, 500);
 
  currentQuestionIndex++; // Move to the next question
  
  if (currentQuestionIndex === questions.length || time <= 0) {
     // If there are no more questions or time is up
    quizEnd();  // End quiz 
  } else {
    getQuestion();  // Get and display the next question
  }
}
   
function quizEnd() {
  // Function to handle the end of the quiz
  clearInterval(timerId); // Stop the timer
 
  var endScreenEl = document.getElementById('end-screen');  // DOM element for the end screen
  endScreenEl.removeAttribute('class'); // Show the end screen

  var finalScoreEl = document.getElementById('final-score');  // DOM element for the final score display
  finalScoreEl.textContent = time;  // Display the final score

  questionsEl.setAttribute('class', 'hide');  // Hide the questions section
}

function clockTick() {
  // Function to update the timer
  time--; // Decrease the time
  timerEl.textContent = time;  // Update the time display

  if (time <= 0) {
    // If time is up
    quizEnd();  // End quiz
  }
}

function saveHighscore() {
  // Function to save the highscore
  var initials = initialsEl.value.trim(); // Get the value of the initials input field

  if (initials !== '') {
     // If the initials value is not empty
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || []; // Get the saved scores from local storage or make an empty array

    var newScore = {
      // New score for the current user
      score: time,
      initials: initials,
    };

    //New highschore redirect to highscores page
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// Event listeners
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
