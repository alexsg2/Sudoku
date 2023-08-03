var numSelected = null;
var tileSelected = null;
var gameWon = false;

// var board = [
//     "500000000",
//     "004200900",
//     "000900008",
//     "083400006",
//     "000009702",
//     "060000000",
//     "007003100",
//     "002000850",
//     "130005000"
// ]

// var solution = [
//     "596184327",
//     "874236915",
//     "321957648",
//     "783412596",
//     "415369782",
//     "269578431",
//     "957823164",
//     "642791853",
//     "138645279"
// ]

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
    ]
    
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
    ]

window.onload = function () {
    setGame();
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
                tile.classList.add("given-number");
            }
            if (r == 2 || r == 5)
            {
                tile.classList.add("horizontal_line");
            }
            if (c == 2 || c == 5)
            {
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
    if (gameWon) 
    {
        return; 
    }

    if (numSelected) {
        const coordinates = this.id.split('-');
        const row = parseInt(coordinates[0]);
        const col = parseInt(coordinates[1]);

        this.innerText = numSelected.id;
        board[row] = board[row].substr(0, col) + numSelected.id + board[row].substr(col + 1);

        // Check if the board is solved after each move
        if (isBoardSolved()) {
            const victoryBox = document.getElementById("victory-box");
            victoryBox.style.display = "block";
            gameWon = true; // Set the flag to indicate the game is won
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

