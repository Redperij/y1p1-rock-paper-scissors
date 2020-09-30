// Globals
let AiIsOn = false;
let p1score = 0; // First player score
let p2score = 0; // Second player score

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
    console.log('startGame()');
    const Intro = document.querySelector('.intro');
    Intro.classList.add('fadeOut');
    AiButton.classList.add('fadeOut');

    document.querySelector('.match').classList.add('fadeIn');

    if ( AiIsOn ) {
        startMatchPvE();
    }
    else {
        startMatchPvP();
    }
}
/*
// Two players
function startMatchPvP() {

}
*/

// Player and AI
function startMatchPvE() {
    // Score
    const p1scoreText = document.querySelector('.p1-score p');
    const p2scoreText = document.querySelector('.p2-score p');
    // Option buttons
    const rockButton = document.querySelector('.rock');
    const paperButton = document.querySelector('.paper');
    const scissorsButton = document.querySelector('.scissors');
    // Hands
    const p1hand = document.querySelector('.p1hand');
    const p2hand = document.querySelector('.p2hand');
    // function, which determines AI choice. Called to determine result.
    function HandleAI() {
        const randomVariable = Math.floor(Math.random()*3);
        if ( randomVariable < 1 ) {
            p2hand.src = 'gfx/rock.png';
            return 'rock';
        }
        else if ( randomVariable < 2 ) {
            p2hand.src = 'gfx/scissors.png';
            return 'scissors';
        }
        else {
            p2hand.src = 'gfx/paper.png';
            return 'paper';
        }
    }
    /*  
    Pretty simple mechanics:
    If player have chosen something, we already can determine result of the round.
    So there is no need to do it in a way how 2 players are handled.
    */
    rockButton.addEventListener('click', () => {
        p1hand.src = 'gfx/rock.png';
        let AIchoice = HandleAI();
        if ( AIchoice == 'paper' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! \n Choose option.';
        }
        else if ( AIchoice == 'scissors' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! \n Choose option.';
        }
        else {
            document.querySelector('.winner').textContent = 'Nobody won! \n Choose option.';
        }
        if(p1score == 10 || p2score == 10 ) {
            endGame();
        }
    });
    paperButton.addEventListener('click', () => {
        p1hand.src = 'gfx/paper.png';
        let AIchoice = HandleAI();
        if ( AIchoice == 'rock' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! \n Choose option.';
        }
        else if ( AIchoice == 'scissors' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! \n Choose option.';
        }
        else {
            document.querySelector('.winner').textContent = 'Nobody won! \n Choose option.';
        }
        if(p1score == 10 || p2score == 10 ) {
            endGame();
        }
    });
    scissorsButton.addEventListener('click', () => {
        p1hand.src = 'gfx/scissors.png';
        let AIchoice = HandleAI();
        if ( AIchoice == 'rock' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! \n Choose option.';
        }
        else if ( AIchoice == 'paper' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! \n Choose option.';
        }
        else {
            document.querySelector('.winner').textContent = 'Nobody won! \n Choose option.';
        }
        if(p1score >= 10 || p2score >= 10 ) {
            endGame();
        }
    });
}

// Finishing the game
function endGame() {
    document.querySelector('.winner').textContent = 'ENOUGH!';
}

/*
function restartGame() {

}
*/
const AiButton = document.querySelector('#aitoggle');
AiButton.addEventListener('click', AiToggle);

const startButton = document.querySelector('.intro button');
startButton.addEventListener('click', startGame);