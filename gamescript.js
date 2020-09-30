// Globals
let AiIsOn = false;

function AiToggle() {
    if ( AiIsOn ) {
        AiIsOn = false;
        document.querySelector('#aitoggle').textContent = 'AI';
        document.querySelector('.p2-score h2').textContent = 'Player 2';
    }
    else {
        AiIsOn = true;
        document.querySelector('#aitoggle').textContent = 'Second Player';
        document.querySelector('.p2-score h2').textContent = 'Computer';
    }

}

function startGame() {
    let p1score = 0; // First player score
    let p2score = 0; // Second player score

    console.log('startGame()');
    const Intro = document.querySelector('.intro');
    Intro.classList.add('fadeOut');
    AiButton.classList.add('fadeOut');

    const p1hand = document.querySelector('.p1hand');
    const p2hand = document.querySelector('.p2hand');
    document.querySelector('.match').classList.add('fadeIn');
}
/*
// Two players
function startRoundPvP {

}
*/
/*
// Player and AI
function startRoundPvE {

}
*/
/*
// Finishing the game
function endGame() {

}
*/
/*
function restartGame() {

}
*/
const AiButton = document.querySelector('#aitoggle');
AiButton.addEventListener('click', AiToggle);

const startButton = document.querySelector('.intro button');
startButton.addEventListener('click', startGame);