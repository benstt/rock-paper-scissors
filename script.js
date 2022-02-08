const computerPlay = () => {
    const words = ["Rock", "Paper", "Scissors"]
    // Get a random index based on the length of the array
    let i = Math.floor(Math.random() * words.length)

    return words[i]
}

const playerWinsRound = (playerSelection, computerSelection) => {
    playerSelection = playerSelection.toLowerCase()
    computerSelection = computerSelection.toLowerCase()

    let toWin = ''

    // Check for possible values the user has to play against to win
    switch (playerSelection) {
        case "rock":
            toWin = "scissors"
            break
        case "paper":
            toWin = "rock"
            break
        case "scissors":
            toWin = "paper"
            break
    }

    if (toWin === computerSelection) {
        return true
    }

    return false
}

let gamesPlayed = 0;
let totalTimesPlayed = 0;
let playerScore = 0;

const playGame = choice => {
    let playerWins = false;
    let computerChoice = '';

    // Play a single game and update score accordingly
    if (totalTimesPlayed < 5) {
        computerChoice = computerPlay();
        playerWins = playerWinsRound(choice, computerChoice);

        if (playerWins) playerScore++;
    }

    return [playerWins, choice, computerChoice];
}

let choiceParagraph = null;
let appendedParagraph = false;

const displayResults = results => {
    let playerWon = results[0];
    let playerChoice = results[1].toLowerCase();
    let computerChoice = results[2].toLowerCase();
    let message = ''
    let resultP = document.querySelector(".robot-info");

    // Change message based on win/lose/tie
    if (playerChoice === computerChoice) {
        message = "It's a tie.";
    } else {
        message = playerWon ? "Aggh! I lost." : "I've won!";
    }
    
    // Append paragraph if doesn't exist yet
    if (!appendedParagraph) {
        choiceParagraph = document.createElement("p");
        document.getElementById("robot-say").appendChild(choiceParagraph);
        appendedParagraph = true;
    }
    
    // Helper function -- capitalizes the first letter of a word.
    const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

    let choice = "My choice was " + capitalize(computerChoice);

    // Change text of the robot
    choiceParagraph.textContent = choice;
    resultP.textContent = message;
}

const showScore = () => {
    // Update score text with the total
    const score = document.getElementById("score-total");
    score.textContent = playerScore;
}

const updateGamesAmount = () => {
    // Update total games played
    const totalGames = document.getElementById("games-total");
    totalGames.textContent = ++gamesPlayed;
}

const resetGame = () => {
    // Reset score and times played and change text of robot
    const robot = document.querySelector(".robot-info");
    robot.textContent = "Let's play again! Choose a weapon!";
    document.getElementById("robot-say").removeChild(choiceParagraph);
    choiceParagraph = null;
    appendedParagraph = false;

    playerScore = 0;
    totalTimesPlayed = 0;
}

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

// React to images
rock.addEventListener('click', () => {
    if (totalTimesPlayed == 5) {
        showScore();
        updateGamesAmount();
        resetGame();
        return;
    }

    let results = playGame('rock');
    displayResults(results);
    totalTimesPlayed++;
});
paper.addEventListener('click', () => {
    if (totalTimesPlayed == 5) {
        showScore();
        updateGamesAmount();
        resetGame();
        return;
    }

    let results = playGame('paper');
    displayResults(results);
    totalTimesPlayed++;
});
scissors.addEventListener('click', () => {
    if (totalTimesPlayed == 5) {
        showScore();
        updateGamesAmount();
        resetGame();
        return;
    }

    let results = playGame('scissors');
    displayResults(results);
    totalTimesPlayed++;
});
