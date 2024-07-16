import { words } from './words.js'
/*-------------------------------- Constants --------------------------------*/


const numberOfGuesses = 5;
/*---------------------------- Variables (state) ----------------------------*/
let guessesRemaining = numberOfGuesses;
let guess = [];
let nextLetter = 0;
let checkGuess = words[Math.floor(Math.random() * words.length)]
console.log(checkGuess)



/*------------------------ Cached Element References ------------------------*/



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
    let guessWord = guess.join('').toLowerCase();
    console.log(guessWord)
    if (guess.length !== 5) {
        return;
    }
    let row = document.getElementsByClassName('word-row')[numberOfGuesses - guessesRemaining];
    for (let g = 0; g < 5; g++) {
        let box = row.children[g];
        if (checkGuess[g] === guessWord[g]) {
            box.classList.add('match');
            box.classList.remove('no-match', 'semi-match')
        } else {
            box.classList.add('no-match');
            box.classList.remove('match', 'semi-match')
        }
    }
    for (let d = 0; d < 5; d++) {
        if (checkGuess[d] !== guessWord[d] && checkGuess.includes(guessWord[d])) {
            let rightInd = checkGuess.indexOf(guessWord[d]);
            if (rightInd !== -1 && checkGuess[rightInd] !== guessWord[rightInd]) {
                let box = row.children[d];
                if (box.classList.contains('no-match')) {
                    box.classList.remove('no-match');
                    box.classList.add('semi-match');
                    checkGuess = checkGuess.replace(guessWord[d], '_');
                }
            }
        }
    }
    if (guessWord === guess) {

    } else {
        updateBoard();
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
            console.log(deleteLetter);
        } else if (key === 'ENTER') {
            checkAnswer();
        }
    });
});


