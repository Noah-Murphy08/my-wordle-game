// const words = require('./js/words.js')
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

function insertLetter(letter) {
    if (nextLetter === 5) {
        return;
    }
    let row = document.getElementsByClassName('word-row')[numberOfGuesses - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = letter;
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
        } else if (key === 'enter') {

        }
    });
});


