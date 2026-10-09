const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

// Removed 'Event' and 'ErrorEvent' so it references the correct native web API properties
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// FIX 2: Create a regular SpeechRecognition instance
let recognition = new window.SpeechRecognition();

// Force the microphone to stay awake between guesses
recognition.continuous = true;
recognition.interimResults = false;

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  // FIX 4: Safely read the continuous array index so it doesn't crash on multiple speech inputs
  const currentResultIndex = event.resultIndex;
  const msg = event.results[currentResultIndex][0].transcript.trim().toLowerCase();
  
  console.log(msg);
  writeMessage(msg); 
}

// Speak result
recognition.addEventListener('result', onSpeak);

// Write what user speaks
function writeMessage(msg) {
  // Clear previous outputs first so they don't pile up down the page
  msgEl.innerHTML = '';  

  const div = document.createElement('div');
  div.textContent = 'You said: ';

  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;
  msgEl.append(div, span);

  checkNumber(msg); 
}

// Check msg against the secret number
function checkNumber(msg) {
  let num = Number(msg);  

  // Update the value of num if it's a single-digit number (your logic is excellent here!)
  if (msg === 'one' || msg === 'won') {
    num = 1;
  } else if (msg === 'two') {
    num = 2;
  } else if (msg === 'three') {
    num = 3;
  } else if (msg === 'four') {
    num = 4;
  } else if (msg === 'five') {
    num = 5;
  } else if (msg === 'six') {
    num = 6;
  } else if (msg === 'seven') {
    num = 7;
  } else if (msg === 'eight') {
    num = 8;
  } else if (msg === 'nine') {
    num = 9;
  }

  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.append(div);
    return;
  }

  // Check if it's in range
  if (num < 1 || num > 100) {
    const div = document.createElement('div');
    div.textContent = 'Number must be between 1 and 100';
    msgEl.append(div);
    return;
  }

  // Check the number and provide feedback
  if (num === randomNum) {
    recognition.stop();
    const h2 = document.createElement('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id = 'play-again';
    button.textContent = 'Play Again';
    
    // Add listener and handler to button
    button.addEventListener('click', () => window.location.reload());

    msgEl.append(h2, button);
  } else if (num > randomNum) {
    const div = document.createElement('div');
    div.textContent = 'GO LOWER';
    msgEl.append(div);
  } else {
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';
    msgEl.append(div);
  }
}

