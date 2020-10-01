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
    document.querySelector('.intro').classList.add('fadeOut');
    AiButton.classList.add('fadeOut');

    if ( AiIsOn ) {
        startMatchPvE();
    }
    else {
        startMatchPvP();
    }
}

// Two players
function startMatchPvP() {
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

    let p1choice;
    let p2choice;

    document.querySelector('.turnscreen').classList.add('fadeIn');

    document.querySelector('#readycontinue').addEventListener('click', p1turn);

    function p1turn() {
        document.querySelector('#readycontinue').removeEventListener('click', p1turn);
        document.querySelector('.turnscreen').classList.remove('fadeIn');
        document.querySelector('.match').classList.add('fadeIn');
        // switching hands
        p2hand.style.display = 'none';
        p1hand.style.display = 'block'

        rockButton.addEventListener('click', HandleRock); // Player 1 chosen rock
        function HandleRock() {
            p1hand.src = 'gfx/rock.png';
            p1choice = 'rock';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
        paperButton.addEventListener('click', HandlePaper); // Player 1 chosen paper
        function HandlePaper() {
            p1hand.src = 'gfx/paper.png';
            p1choice = 'paper';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
        scissorsButton.addEventListener('click', HandleScissors); // Player 1 chosen scissors
        function HandleScissors() {
            p1hand.src = 'gfx/scissors.png';
            p1choice = 'scissors';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
    }
    // This function hides match screen and shows turn screen, prepairing it for player.
    function prepareP2turn() {
        document.querySelector('.turnscreen h2').textContent = 'Player 2 turn';
        document.querySelector('.match').classList.remove('fadeIn');
        document.querySelector('.turnscreen').classList.add('fadeIn');

        document.querySelector('#readycontinue').addEventListener('click', p2turn);
    }
    
    function p2turn() {
        // removing button
        document.querySelector('#readycontinue').removeEventListener('click', p2turn);
        // switching hands
        p1hand.style.display = 'none';
        p2hand.style.display = 'block';
        // hiding turn screen and showing match screen
        document.querySelector('.turnscreen').classList.remove('fadeIn');
        document.querySelector('.match').classList.add('fadeIn');

        rockButton.addEventListener('click', HandleRock); // Player 1 chosen rock
        function HandleRock() {
            p2hand.src = 'gfx/rock.png';
            p2choice = 'rock';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
        paperButton.addEventListener('click', HandlePaper); // Player 1 chosen paper
        function HandlePaper() {
            p2hand.src = 'gfx/paper.png';
            p2choice = 'paper';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
        scissorsButton.addEventListener('click', HandleScissors); // Player 1 chosen scissors
        function HandleScissors() {
            p2hand.src = 'gfx/scissors.png';
            p2choice = 'scissors';
            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
    }

    function result() {
        p1hand.style.display = 'block'
        if ( p2choice == 'rock' && p1choice == 'paper' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
        }
        else if ( p2choice == 'rock' && p1choice == 'scissors' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
        }
        else if ( p2choice == 'paper' && p1choice == 'scissors' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
        }
        else if ( p2choice == 'paper' && p1choice == 'rock' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
        }
        else if ( p2choice == 'scissors' && p1choice == 'rock' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
        }
        else if ( p2choice == 'scissors' && p1choice == 'paper' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
        }
        else {
            document.querySelector('.winner').textContent = 'Nobody won! Press any button to continue';
        }
        if ( p1score >= 10 || p2score >= 10 ) {

            endGame( p1score, p2score );
        }
        else {
            rockButton.addEventListener('click', prepareP1turn);
            paperButton.addEventListener('click', prepareP1turn);
            scissorsButton.addEventListener('click', prepareP1turn);
        }
    }

    function prepareP1turn() {
        rockButton.removeEventListener('click', prepareP1turn);
        paperButton.removeEventListener('click', prepareP1turn);
        scissorsButton.removeEventListener('click', prepareP1turn);
        // hiding match screen and preparing it for player
        document.querySelector('.match').classList.remove('fadeIn');
        document.querySelector('.winner').textContent = 'Choose option';
        document.querySelector('.turnscreen h2').textContent = 'Player 1 turn';
        // showing turnscreen
        document.querySelector('.turnscreen').classList.add('fadeIn');

        document.querySelector('#readycontinue').addEventListener('click', p1turn);
    }
}

// Player and AI
function startMatchPvE() {
    document.querySelector('.match').classList.add('fadeIn');
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
    rockButton.addEventListener('click', HandleRock); // Player chosen rock
    function HandleRock() {
        p1hand.src = 'gfx/rock.png';
        result('rock',HandleAI());
    }
    paperButton.addEventListener('click', HandlePaper); // Player chosen paper
    function HandlePaper() {
        p1hand.src = 'gfx/paper.png';
        result('paper',HandleAI());
    }
    scissorsButton.addEventListener('click', HandleScissors); // Player chosen scissors
    function HandleScissors() {
        p1hand.src = 'gfx/scissors.png';
        result('scissors',HandleAI());
    }
    function result(playerChoice, AIchoice) {
        console.log('result!')
        if ( AIchoice == 'rock' && playerChoice == 'paper' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! Choose option.';
        }
        else if ( AIchoice == 'rock' && playerChoice == 'scissors' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! Choose option.';
        }
        else if ( AIchoice == 'paper' && playerChoice == 'scissors' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! Choose option.';
        }
        else if ( AIchoice == 'paper' && playerChoice == 'rock' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! Choose option.';
        }
        else if ( AIchoice == 'scissors' && playerChoice == 'rock' ) {
            p1score++;
            p1scoreText.textContent = p1score;
            document.querySelector('.winner').textContent = 'You won! Choose option.';
        }
        else if ( AIchoice == 'scissors' && playerChoice == 'paper' ) {
            p2score++;
            p2scoreText.textContent = p2score;
            document.querySelector('.winner').textContent = 'Computer won! Choose option.';
        }
        else {
            document.querySelector('.winner').textContent = 'Nobody won! Choose option.';
        }
        // If somebody has maximum score we should end the game
        if(p1score >= 10 || p2score >= 10 ) {
            rockButton.removeEventListener('click', HandleRock); // This step is vital for restart mechanics, we must remove all button event listeners.
            scissorsButton.removeEventListener('click', HandleScissors); // Otherwise we will find ourselves pressing one button several times and determining several results. 
            paperButton.removeEventListener('click', HandlePaper);
            endGame(p1score, p2score);
        }
    }
}

// Finishing the game
function endGame(p1score, p2score) {
    document.querySelector('.match').classList.remove('fadeIn'); // hiding match screen
    if ( AiIsOn ) {
        if ( p1score > p2score ) {
            document.querySelector('.endgame h2').textContent = 'Player has won with score ' + p1score + '/' + p2score + '!';
        }
        else {
            document.querySelector('.endgame h2').textContent = 'Computer has won with score ' + p1score + '/' + p2score + '!';
        }
    }
    else {
        if ( p1score > p2score ) {
            document.querySelector('.endgame h2').textContent = 'Player 1 has won with score ' + p1score + '/' + p2score + '!';
        }
        else {
            document.querySelector('.endgame h2').textContent = 'Player 2 has won with score ' + p1score + '/' + p2score + '!';
        }
    }
    document.querySelector('.endgame').classList.add('fadeIn'); //endgame screen
    document.querySelector('.endgame button').addEventListener('click', restartGame); // restart button
}


function restartGame() {
    // removing button event listener in order to prevent bugs
    document.querySelector('.endgame button').removeEventListener('click', restartGame);
    // hiding endgame screen
    document.querySelector('.endgame').classList.remove('fadeIn');
    // returning things back to normal
    document.querySelector('.winner').textContent = 'Choose an option';
    p1score = 0;
    p2score = 0;
    document.querySelector('.p1-score p').textContent = p1score;
    document.querySelector('.p2-score p').textContent = p2score;
    // returning start screen
    document.querySelector('.intro').classList.remove('fadeOut');
    AiButton.classList.remove('fadeOut');
}

const AiButton = document.querySelector('#aitoggle');
AiButton.addEventListener('click', AiToggle);

const startButton = document.querySelector('.intro button');
startButton.addEventListener('click', startGame);