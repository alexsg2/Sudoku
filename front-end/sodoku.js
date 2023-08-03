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
    document.getElementById("timer").innerText = "Time: 0:00";
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!gameWon) {
        seconds++;
        const timeDisplay = formatTime(seconds);
        document.getElementById("timer").innerText = "Time: " + timeDisplay;
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
    for (let i = 1; i <= 9; i++) {
      let number = document.createElement("div");
      number.id = i;
      number.innerText = i;
      number.addEventListener("click", selectNumber);
      number.classList.add("number");
      document.getElementById("digits").appendChild(number);
    }
  
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
            document.getElementById("board").appendChild(tile);
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
    // Update the victory box to display the final time
    const victoryBox = document.getElementById("victory-box");
    victoryBox.style.display = "block";
    const timeDisplay = document.createElement("p");
    timeDisplay.innerText = "Time taken: " + formatTime(finalTime);
    victoryBox.appendChild(timeDisplay);
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
