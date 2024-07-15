// const words = require('./js/words.js')
/*-------------------------------- Constants --------------------------------*/


const numberOfGuesses = 5;
/*---------------------------- Variables (state) ----------------------------*/
let guessesRemaining = numberOfGuesses;
let guess = [];
let nextLetter = 0;



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



init();


/*----------------------------- Event Listeners -----------------------------*/
document.querySelectorAll('.keyboard-btn, .enter, .delete').forEach ((button) => {
    button.addEventListener('click', (evt) => {
        const key = evt.target.innerText;
        console.log(key)
    });
});


