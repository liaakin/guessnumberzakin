'use strict';

// Warte 5 Sekunden, bevor der Loader versteckt wird
setTimeout(function () {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}, 5000);

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
document.querySelector('.again').addEventListener('click', function () {
  displayMessage('Start guessing...');
  displayScore('20');
  displayNumber('?');
  styleChange('#222', '15rem');
  document.querySelector('.guess').value = ' ';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
});
