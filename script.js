'use strict';

/////// Loader, Start, Timer, Quit and Rules Features //////////////////////
const startBtn = document.querySelectorAll('.startBtn');
const startBtns = document.querySelector('.start');
const loader = document.querySelector('.loader');
const rules = document.querySelector('.rulesWindow');

const timerDisplay = document.getElementById('timer');

// Timer function
const timer = function () {
  let timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  const countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      displayMessage('Time is up! You lost!');
      clearInterval(countdown);
      document.querySelector('.check').disabled = true;
    }
  }, 1000);
};
// Start Buttons display after 5s
const startBtnsHidden = function (s) {
  setTimeout(() => {
    startBtns.classList.remove('hidden');
  }, s);
};
startBtnsHidden(5000);
// Homepage Start and Rules Buttons
startBtn[0].addEventListener('click', function () {
  loader.classList.add('hidden');
  timer();
});
startBtn[1].addEventListener('click', function () {
  rules.classList.remove('hidden');
});
// Rules Window Close
document.querySelector('.rulesClose').addEventListener('click', function () {
  rules.classList.add('hidden');
});

// Game Quit
document.querySelector('.quit').addEventListener('click', function () {
  loader.classList.remove('hidden');
  startBtns.classList.add('hidden');
  startBtnsHidden(6000);
  again();
});

//////////////////////////////////////////////////

// reused variables and funktions:
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

const displayNumber = nr =>
  (document.querySelector('.number').textContent = nr);

const displayScore = sc => (document.querySelector('.score').textContent = sc);

const styleChange = (cl, w) => {
  document.querySelector('body').style.backgroundColor = `${cl}`;
  document.querySelector('.number').style.width = `${w}`;
};

// Check guess:
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // When there is no input
  if (!guess) {
    displayMessage('No Number');
  }
  // When player wins
  else if (guess === secretNumber) {
    displayMessage('You Win!');
    displayNumber(secretNumber);
    styleChange('green', '30rem');
    let highscore = document.querySelector('.highscore').textContent;
    if (score > highscore) {
      document.querySelector('.highscore').textContent = score;
    }
  }
  // When guess is different
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
      score--;
      displayScore(score);
    } else {
      displayMessage('You Lost!');
      displayScore('0');
      displayNumber(secretNumber);
      styleChange('red');
    }
  }
});

// Playing Again-Button:
const again = function () {
  displayMessage('Start guessing...');
  displayScore('20');
  displayNumber('?');
  styleChange('#222', '15rem');
  document.querySelector('.guess').value = ' ';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  timer();
};
document.querySelector('.again').addEventListener('click', again);
