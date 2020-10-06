// Globals
let AiIsOn = false;
let p1score = 0; // First player score
let p2score = 0; // Second player score
let p1row = 0; // Used for determining quantity of rounds won by player in a row
let p2row = 0;
let p1Resultlog = []; // Result logs are not used and are here only for debugging
let p2Resultlog = []; // They keep all results for assigned player until game restart

function AiToggle() {
    if ( AiIsOn ) {
        AiIsOn = false; // AI is off
        document.querySelector('#aitoggle').textContent = 'AI';
        document.querySelector('.p2-score h2').textContent = 'Player 2';
    }
    else {
        AiIsOn = true; // AI is on
        document.querySelector('#aitoggle').textContent = 'Second Player';
        document.querySelector('.p2-score h2').textContent = 'Computer';
    }

}

function startGame() {
    console.log('Game started');
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
    console.log('PvP match!');
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
    // showing turnscreen
    document.querySelector('.turnscreen').classList.add('fadeIn');

    document.querySelector('#readycontinue').addEventListener('click', p1turn);

    function p1turn() {
        console.log('PvP round')
        document.querySelector('#readycontinue').removeEventListener('click', p1turn);
        // preparing match screen for player 1
        document.querySelector('.winner').textContent = 'Choose option';
        // hiding turnscreen and showing match
        document.querySelector('.turnscreen').classList.remove('fadeIn');
        document.querySelector('.match').classList.add('fadeIn');
        // switching hands
        p2hand.classList.remove('fadeIn');
        p1hand.classList.add('fadeIn');

        rockButton.addEventListener('click', HandleRock); // Player 1 chosen rock
        function HandleRock() {
            p1hand.src = 'gfx/rock.png';
            p1choice = 'rock';

            // loging
            p1Resultlog.push('rock');
            console.log('Player 1 have chosen ' + p1choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
        paperButton.addEventListener('click', HandlePaper); // Player 1 chosen paper
        function HandlePaper() {
            p1hand.src = 'gfx/paper.png';
            p1choice = 'paper';

            // loging
            p1Resultlog.push('paper');
            console.log('Player 1 have chosen ' + p1choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
        scissorsButton.addEventListener('click', HandleScissors); // Player 1 chosen scissors
        function HandleScissors() {
            p1hand.src = 'gfx/scissors.png';
            p1choice = 'scissors';

            // loging
            p1Resultlog.push('scissors');
            console.log('Player 1 have chosen ' + p1choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            prepareP2turn();
        }
    }
    // This function hides match screen and shows turn screen, prepairing it for player 2.
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
        p1hand.classList.remove('fadeIn');
        p2hand.classList.add('fadeIn');
        // hiding turn screen and showing match screen
        document.querySelector('.turnscreen').classList.remove('fadeIn');
        document.querySelector('.match').classList.add('fadeIn');

        rockButton.addEventListener('click', HandleRock); // Player 2 chosen rock
        function HandleRock() {
            p2hand.src = 'gfx/rock.png';
            p2choice = 'rock';

            //loging
            p2Resultlog.push('rock');
            console.log('Player 2 have chosen ' + p2choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
        paperButton.addEventListener('click', HandlePaper); // Player 2 chosen paper
        function HandlePaper() {
            p2hand.src = 'gfx/paper.png';
            p2choice = 'paper';

            //loging
            p2Resultlog.push('paper');
            console.log('Player 2 have chosen ' + p2choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
        scissorsButton.addEventListener('click', HandleScissors); // Player 2 chosen scissors
        function HandleScissors() {
            p2hand.src = 'gfx/scissors.png';
            p2choice = 'scissors';
            
            //loging
            p2Resultlog.push('scissors');
            console.log('Player 2 have chosen ' + p2choice);

            rockButton.removeEventListener('click', HandleRock);
            paperButton.removeEventListener('click', HandlePaper);
            scissorsButton.removeEventListener('click', HandleScissors);
            result();
        }
    }
    // This function determines round result and need to continue match.
    function result() {
        // Hiding screen and options
        document.querySelector('.winner').classList.add('fadeOut');
        document.querySelector('.options').classList.add('fadeOut');
        // HIding hand
        p2hand.classList.remove('fadeIn');

        // Preparation for animation
        p2hand.src = 'gfx/rock.png';
        p1hand.src = 'gfx/rock.png';
        p2hand.classList.add('fadeIn');
        p1hand.classList.add('fadeIn');

        // Handling animation
        p1hand.style.animation = "shakePlayer1 2s ease";
        p2hand.style.animation = "shakePlayer2 2s ease";

        setTimeout(() => {
            // Showing choices
            p1hand.src = `gfx/${p1choice}.png`;
            p2hand.src = `gfx/${p2choice}.png`;

            // Showing screen and options
            document.querySelector('.winner').classList.remove('fadeOut');
            document.querySelector('.options').classList.remove('fadeOut');

            // Removing animation
            p1hand.style.animation = "";
            p2hand.style.animation = "";

            roundResult()

        }, 2000 );
        function roundResult() {
            if ( p2choice == 'rock' && p1choice == 'paper' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player 1 won');
                document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
            }
            else if ( p2choice == 'rock' && p1choice == 'scissors' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Player 2 won');
                document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
            }
            else if ( p2choice == 'paper' && p1choice == 'scissors' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player 1 won');
                document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
            }
            else if ( p2choice == 'paper' && p1choice == 'rock' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Player 2 won');
                document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
            }
            else if ( p2choice == 'scissors' && p1choice == 'rock' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player 1 won');
                document.querySelector('.winner').textContent = 'Player 1 won round! Press any button to continue';
            }
            else if ( p2choice == 'scissors' && p1choice == 'paper' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Player 2 won');
                document.querySelector('.winner').textContent = 'Player 2 won round! Press any button to continue';
            }
            else {
                p1row = 0;
                p2row = 0;
                console.log('Nobody won');
                document.querySelector('.winner').textContent = 'Nobody won! Press any button to continue';
            }
            // Showing choices log
            console.log('Player 1 choices are:');
            console.log(p1Resultlog);
            console.log('Player 2 choices are:');
            console.log(p2Resultlog);

            // If somebody has maximum score we should end the game
            if ( p1score >= 10 || p2score >= 10 || p1row >= 3 || p2row >= 3 ) { 
                document.querySelector('.turnscreen h2').textContent = 'Player 1 turn';
                endGame( p1score, p2score, p1row, p2row );
            }
            // In other case we have to keep playing
            else {
                rockButton.addEventListener('click', prepareP1turn);
                paperButton.addEventListener('click', prepareP1turn);
                scissorsButton.addEventListener('click', prepareP1turn);
            }
        }
    }
    // This function starts next round. In other words, reverts everything to the state of first player's turn.
    function prepareP1turn() {
        rockButton.removeEventListener('click', prepareP1turn);
        paperButton.removeEventListener('click', prepareP1turn);
        scissorsButton.removeEventListener('click', prepareP1turn);
        // Hiding match screen and preparing turn screen
        document.querySelector('.match').classList.remove('fadeIn');
        document.querySelector('.turnscreen h2').textContent = 'Player 1 turn';
        // Showing turnscreen
        document.querySelector('.turnscreen').classList.add('fadeIn');

        document.querySelector('#readycontinue').addEventListener('click', p1turn);
    }
}

// Player and AI
function startMatchPvE() {
    console.log('PvE match');
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

    // Showing hands
    p1hand.classList.remove('fadeOut');
    p2hand.classList.remove('fadeOut');
    // function, which determines AI choice. Called to determine result.
    function HandleAI() {
        const randomVariable = Math.floor(Math.random()*3);
        console.log('AI rolled ' + randomVariable);
        if ( randomVariable < 1 ) {
            return 'rock';
        }
        else if ( randomVariable < 2 ) {
            return 'scissors';
        }
        else {
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
        document.querySelector('.winner').classList.add('fadeOut');
        document.querySelector('.options').classList.add('fadeOut');
        p1hand.src = 'gfx/rock.png';
        p2hand.src = 'gfx/rock.png';
        result('rock',HandleAI());
    }
    paperButton.addEventListener('click', HandlePaper); // Player chosen paper
    function HandlePaper() {
        document.querySelector('.winner').classList.add('fadeOut');
        document.querySelector('.options').classList.add('fadeOut');
        p1hand.src = 'gfx/rock.png';
        p2hand.src = 'gfx/rock.png';
        result('paper',HandleAI());
    }
    scissorsButton.addEventListener('click', HandleScissors); // Player chosen scissors
    function HandleScissors() {
        document.querySelector('.winner').classList.add('fadeOut');
        document.querySelector('.options').classList.add('fadeOut');
        p1hand.src = 'gfx/rock.png';
        p2hand.src = 'gfx/rock.png';
        result('scissors',HandleAI());
    }
    // This function determines round result 
    function result(playerChoice, AIchoice) {
        // Handling animation
        p1hand.style.animation = "shakePlayer1 2s ease";
        p2hand.style.animation = "shakePlayer2 2s ease";

        setTimeout(() => {
            // Showing choices
            p1hand.src = `gfx/${playerChoice}.png`;
            p2hand.src = `gfx/${AIchoice}.png`;

            // Showing screen and options
            document.querySelector('.winner').classList.remove('fadeOut');
            document.querySelector('.options').classList.remove('fadeOut');

            // Removing animation
            p1hand.style.animation = "";
            p2hand.style.animation = "";

            roundResult();

        }, 2000 );
        // loging
        console.log('Player have chosen ' + playerChoice);
        console.log('Computer have chosen ' + AIchoice);
        p1Resultlog.push(playerChoice);
        p2Resultlog.push(AIchoice);
        console.log('Player choices are:');
        console.log(p1Resultlog);
        console.log('Computer choices are:');
        console.log(p2Resultlog);

        function roundResult() {
            if ( AIchoice == 'rock' && playerChoice == 'paper' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player won!');
                document.querySelector('.winner').textContent = 'You won! Choose option.';
            }
            else if ( AIchoice == 'rock' && playerChoice == 'scissors' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Computer won!');
                document.querySelector('.winner').textContent = 'Computer won! Choose option.';
            }
            else if ( AIchoice == 'paper' && playerChoice == 'scissors' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player won!');
                document.querySelector('.winner').textContent = 'You won! Choose option.';
            }
            else if ( AIchoice == 'paper' && playerChoice == 'rock' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Computer won!');
                document.querySelector('.winner').textContent = 'Computer won! Choose option.';
            }
            else if ( AIchoice == 'scissors' && playerChoice == 'rock' ) {
                p1score++;
                p1scoreText.textContent = p1score;
                p1row++;
                p2row = 0;
                console.log('Player won!');
                document.querySelector('.winner').textContent = 'You won! Choose option.';
            }
            else if ( AIchoice == 'scissors' && playerChoice == 'paper' ) {
                p2score++;
                p2scoreText.textContent = p2score;
                p2row++;
                p1row = 0;
                console.log('Computer won!');
                document.querySelector('.winner').textContent = 'Computer won! Choose option.';
            }
            else {
                p1row = 0;
                p2row = 0;
                console.log('Nobody won!');
                document.querySelector('.winner').textContent = 'Nobody won! Choose option.';
            }
            // If somebody has maximum score we should end the game
            if(p1score >= 10 || p2score >= 10 || p1row >= 3 || p2row >= 3 ) {
                rockButton.removeEventListener('click', HandleRock); // This step is vital for restart mechanics, we must remove all button event listeners.
                scissorsButton.removeEventListener('click', HandleScissors); // Otherwise we will find ourselves pressing one button several times and determining several results. 
                paperButton.removeEventListener('click', HandlePaper);
                endGame(p1score, p2score, p1row, p2row);
            }
        }
    }
}

// Finishing the game
function endGame(p1score, p2score, p1row, p2row) {
    console.log('Finishing the game');
    document.querySelector('.match').classList.remove('fadeIn'); // hiding match screen
    if ( AiIsOn ) {
        console.log('Computer match over. Scores are:')
        console.log('Player  : ' + p1score + ' with row of ' + p1row + ' victories');
        console.log('Computer: ' + p2score + ' with row of ' + p2row + ' victories');
        if ( ( p1score > p2score && p2row < 3 ) || p1row >= 3 ) {
            console.log('Player has won');
            document.querySelector('.endgame h2').textContent = 'Player won';
        }
        else {
            console.log('Computer has won');
            document.querySelector('.endgame h2').textContent = 'Computer won';
        }
    }
    else {
        console.log('Two players match over. Scores are:')
        console.log('Player 1: ' + p1score + ' with row of ' + p1row + ' victories');
        console.log('Player 2: ' + p2score + ' with row of ' + p2row + ' victories');
        if ( ( p1score > p2score && p2row < 3 ) || p1row >= 3 ) {
            console.log('Player 1 has won');
            document.querySelector('.endgame h2').textContent = 'Player 1 won';
        }
        else {
            console.log('Player 2 has won');
            document.querySelector('.endgame h2').textContent = 'Player 2 won';
        }
    }
    document.querySelector('.endgame').classList.add('fadeIn'); //endgame screen
    document.querySelector('.endgame button').addEventListener('click', restartGame); // restart button
}


function restartGame() {
    console.log('Restarting the game');
    // removing button event listener in order to prevent bugs
    document.querySelector('.endgame button').removeEventListener('click', restartGame);
    // hiding endgame screen
    document.querySelector('.endgame').classList.remove('fadeIn');
    // returning things back to normal
    document.querySelector('.winner').textContent = 'Choose an option';
    p1score = 0;
    p2score = 0;
    p1row = 0;
    p2row = 0;
    p1Resultlog = [];
    p2Resultlog = [];
    // returning hands in the normal state
    document.querySelector('.p1hand').classList.add('fadeOut');
    document.querySelector('.p2hand').classList.add('fadeOut');
    document.querySelector('.p1hand').classList.remove('fadeIn');
    document.querySelector('.p2hand').classList.remove('fadeIn');
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