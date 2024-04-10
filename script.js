'use strict';

/*
see what elements will be used
roll dice button
  *current 
  *actual points
hold button
  *switch players
new game
*/

//let diceImage = "img/dice-" + String(diceNumber) + ".png";
const name0El = document.getElementById('name--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const player0El = document.querySelector('.player--0');

const name1El = document.getElementById('name--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const mobileDevices = window.matchMedia('(max-width: 50em)');
const desktopDevices = window.matchMedia('(min-width: 50em)');

score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];

//ROLL DICE BUTTON
btnRoll.addEventListener('click', function () {
  //1. Generate rand dice roll
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `imgs/dice-${diceNumber}.png`;

  //3. Check rule: if 1, switch to next player

  //TUTOR'S

  //MY APROACH
  if (diceNumber !== 1) {
    if (activePlayer === 0) {
      scoreSummatory(current0El, diceNumber);
    } else {
      scoreSummatory(current1El, diceNumber);
    }
  } else {
    //switch next player
    nextTurn();
  }
});

//HOLD BUTTON
btnHold.addEventListener('click', function () {
  holdScore();
  nextTurn();
});

function nextTurn() {
  currentScore = 0;
  if (activePlayer === 0) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
    current0El.textContent = 0;
    activePlayer = 1;
  } else {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    current1El.textContent = 0;
    activePlayer = 0;
  }
}

function scoreSummatory(playerScore, diceNumber) {
  currentScore += diceNumber;
  playerScore.textContent = currentScore;
  //console.log(currentScore);
}

function holdScore() {
  diceEl.classList.add('hidden');

  if (activePlayer === 0) {
    score[0] += currentScore;
    score0El.textContent = score[0];
    if (score[0] >= 100) {
      player0El.classList.add('player--winner');
      disableButtons();
    }
  } else {
    score[1] += currentScore;
    score1El.textContent = score[1];
    if (score[1] >= 100) {
      player1El.classList.add('player--winner');
      disableButtons();
    }
  }
  console.log(score[0], score[1]);
}

function disableButtons() {
  btnHold.disabled = true;
  btnRoll.disabled = true;
}

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');

  btnHold.disabled = false;
  btnRoll.disabled = false;

  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;

  player0El.classList.remove('player--winner');
  current0El.textContent = 0;
  score0El.textContent = 0;

  player1El.classList.remove('player--winner');
  current1El.textContent = 0;
  score1El.textContent = 0;
});
