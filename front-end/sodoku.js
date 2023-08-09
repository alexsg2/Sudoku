var numSelected = null;
var tileSelected = null;
var gameWon = false;
var seconds = 0;
var finalTime = null; 
var timerInterval = null; 
var isTimerPaused = false;
var isTimerPlaying = true;

var board = [
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000001",
];

var solution = [
  "100000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000000",
  "000000001",
];

window.onload = function () {
    setGame();
    startTimer();
};

function startTimer() {
    document.getElementById("timer").innerText = "0:00";
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!gameWon) {
        seconds++;
        const timeDisplay = formatTime(seconds);
        document.getElementById("timer").innerText = timeDisplay;
    }
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    if (hours > 0) {
        return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    } else if (minutes > 0) {
        return formattedMinutes + ":" + formattedSeconds;
    } else {
        if (seconds >= 10) {
            return "0:" + seconds;
        } else {
            return "0.0" + seconds;
        }
    }
}


function setGame() {
    // Clear the "digits" container
    const digitsContainer = document.getElementById("digits");
    digitsContainer.innerHTML = "";

    // Add the numbers to the "digits" container
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        digitsContainer.appendChild(number);
    }

    // Clear the "board" container
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    // Add the tiles to the "board" container
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "0") {
                tile.innerText = board[r][c];
                tile.classList.add("given-number"); // Add the class for given numbers
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal_line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical_line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            boardContainer.appendChild(tile);
        }
    }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
    if (gameWon) {
        return;
    }
  
    if (numSelected) {
        const coordinates = this.id.split("-");
        const row = parseInt(coordinates[0]);
        const col = parseInt(coordinates[1]);
    
        // Check if the clicked tile contains a given number (has the class "given-number")
        if (this.classList.contains("given-number")) {
            return; // Do not allow modification for given numbers
        }
    
        this.innerText = numSelected.id;
        board[row] = board[row].substr(0, col) + numSelected.id + board[row].substr(col + 1);
    
        // Check if the board is solved after each move
        if (isBoardSolved()) {
            gameWon = true; // Set the flag to indicate the game is won
            finalTime = seconds; // Store the final time once the game is won
            clearInterval(timerInterval); // Stop the timer
    
            // Call the function to display the final time in the victory box
            displayFinalTime();
        }
    }
}

function isBoardSolved() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (parseInt(board[r][c]) !== parseInt(solution[r][c])) {
        return false;
      }
    }
  }
  return true;
}

function displayFinalTime() {
    // Update the victory box to display the final time and congrats message
    const victoryBox = document.getElementById("victory-box");
    victoryBox.style.display = "block";
  
    // Remove any previous content in the victory box
    victoryBox.innerHTML = "";
  
    // Create the <h2> element
    const congratsHeading = document.createElement("h2");
    congratsHeading.innerText = "🏆 Congrats! 🏆";
    victoryBox.appendChild(congratsHeading);
  
    // "Congrats" message and final time display
    const congratsMessage = document.createElement("p");
    congratsMessage.innerText = "Congratulations! You finished the puzzle in: " + formatTime(finalTime) + ".";
    victoryBox.appendChild(congratsMessage);
  
    // "Play Another Sudoku" button
    const playAnotherButton = document.createElement("button");
    playAnotherButton.innerText = "Play Another Sudoku";
    playAnotherButton.classList.add("rounded-button");
    victoryBox.appendChild(playAnotherButton);
  
    // Add the event listener for the "Play Another Sudoku" button
    playAnotherButton.addEventListener("click", playAnotherSudoku);
}  

function closeVictoryBox() {
    document.getElementById("victory-box").style.display = "none";
}

function toggleTimer() {
    if (isTimerPlaying) {
        // Pause the timer
        isTimerPlaying = false;
        clearInterval(timerInterval);
        document.getElementById("playPauseButton").innerHTML =
            '<ion-icon name="play-outline"></ion-icon>';
    } else {
        // Resume the timer
        isTimerPlaying = true;
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById("playPauseButton").innerHTML =
            '<ion-icon name="pause-outline"></ion-icon>';
    }
}

function playAnotherSudoku() {
    // Reset game state
    numSelected = null;
    tileSelected = null;
    gameWon = false;
    seconds = 0;
    finalTime = null;
    clearInterval(timerInterval);
    isTimerPaused = false;
    isTimerPlaying = true;

    // Clear the victory box content before adding new elements
    const victoryBox = document.getElementById("victory-box");
    victoryBox.innerHTML = "";

    // Hide the victory box
    victoryBox.style.display = "none";

    // Clear the current board container
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    // Generate a new random board and solution
    generateNewBoardAndSolution();

    // Remove the "number-selected" class from the previously selected number
    if (numSelected) {
        numSelected.classList.remove("number-selected");
    }

    // Set up the game again
    setGame();
    startTimer();
}

function generateNewBoardAndSolution() {
    const sampleBoard = [
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000021",
    ];

    const sampleSolution = [
        "100000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000000",
        "000000021",
    ];

    // Update the global "board" and "solution" arrays with the new values
    board = sampleBoard;
    solution = sampleSolution;
}