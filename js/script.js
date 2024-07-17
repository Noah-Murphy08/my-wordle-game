import { words } from './words.js'
/*-------------------------------- Constants --------------------------------*/


const numberOfGuesses = 5;
/*---------------------------- Variables (state) ----------------------------*/
let guessesRemaining = numberOfGuesses;
let guess = [];
let nextLetter = 0;
let checkGuess = words[Math.floor(Math.random() * words.length)];



/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message');
const rulesEl = document.getElementById('rules');
const rulesText = document.getElementById('showrules')

/*-------------------------------- Functions --------------------------------*/
function init() {
    let board = document.getElementById('game-board');
    
    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement('div');
        row.className = 'word-row';

        for (let k = 0; k < 5; k++) {
            let box = document.createElement('div');
            box.className = 'letter-box';
            row.appendChild(box);
        }
        
        board.appendChild(row);
    }
}

function updateBoard() {
    guessesRemaining -= 1;
    guess = [];
    nextLetter = 0;
}

function insertLetter(letter) {
    if (nextLetter === 5) {
        return;
    }
    let row = document.getElementsByClassName('word-row')[numberOfGuesses - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = letter;
    if (letter === checkGuess[nextLetter]) {
        box.classList.add('match')
    }
    guess.push(letter);
    nextLetter += 1;
}

function deleteLetter() {
    if (nextLetter === 0) {
        return;
    }
    nextLetter -= 1;
    let row = document.getElementsByClassName('word-row')[numberOfGuesses - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = '';
    guess.pop();
}

function checkAnswer() {
    if (guess.length !== 5 || !words.includes(guess.join('').toLocaleLowerCase())) {
        return;
    }
    let guessWord = guess.join('').toLowerCase();
    let row = document.getElementsByClassName('word-row')[numberOfGuesses - guessesRemaining];
    let checkGuessCopy = checkGuess.split('');
    for (let g = 0; g < 5; g++) {
        let box = row.children[g];
        if (checkGuess[g] === guessWord[g]) {
            box.classList.add('match');
            box.classList.remove('no-match', 'semi-match');
            checkGuessCopy[g] = '_';
        } else {
            box.classList.add('no-match');
            box.classList.remove('match', 'semi-match');
        }
    }
    for (let d = 0; d < 5; d++) {
        if (checkGuess[d] !== guessWord[d] && checkGuess.includes(guessWord[d])) {
            let rightInd = checkGuessCopy.indexOf(guessWord[d]);
            if (rightInd !== -1 && checkGuessCopy[rightInd] !== '_') {
                let box = row.children[d];
                if (box.classList.contains('no-match')) {
                    box.classList.remove('no-match');
                    box.classList.add('semi-match');
                    checkGuessCopy[rightInd] = '_';

                }
            }
        }
    }
    if (guessWord === checkGuess) {
        message();
    } else {
        updateBoard();
        message();
    }
}

function message() {
    let guessWord = guess.join('').toLowerCase();
    if (guessesRemaining > 0 && guessWord !== checkGuess) {
        messageEl.textContent = `There are ${guessesRemaining} guesses remaining.`;
        removeReset();
    } else if (guessesRemaining >= 0 && guessWord == checkGuess) {
        messageEl.textContent = `Congrats! You win!`;
        createReset();
    } else {
        messageEl.textContent = `Nice try! The correct word was ${checkGuess}. Want to try again?`;
        createReset();
    }
}


function removeReset() {
    let playAgain = document.getElementById('restart');
    if (playAgain) {
        playAgain.remove();
    }
}

function createReset() {
    let playAgain = document.createElement('button');
    playAgain.textContent = 'Play again';
    playAgain.id = 'reset';
    playAgain.addEventListener('click', function() {
        reset();
    });
    messageEl.appendChild(playAgain);
}

function reset() {
    guessesRemaining = numberOfGuesses;
    guess = [];
    nextLetter = 0;
    checkGuess = words[Math.floor(Math.random() * words.length)];
    let board = document.getElementById('game-board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    init();
    messageEl.textContent = '';
}

function displayRules() {
    if (rulesText.style.display === 'none') {
        rulesText.style.display = 'block';
    } else {
        rulesText.style.display = 'none';
    }
}

init();

/*----------------------------- Event Listeners -----------------------------*/
document.querySelectorAll('.keyboard-btn, .enter, .delete').forEach ((button) => {
    button.addEventListener('click', (evt) => {
        const key = evt.target.innerText;
        if (key.length === 1 && key.match(/[a-z]/i)) {
            insertLetter(key);
        } else if (key === 'DEL') {
            deleteLetter();
        } else if (key === 'ENTER') {
            checkAnswer();
            message();
        }
    });
});

rulesEl.addEventListener('click', displayRules);
