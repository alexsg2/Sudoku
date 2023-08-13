const express = require('express');
const app = express();

const GRID_SIZE = 9;
const EASYMODE = 36;
const MEDIUMMODE = 30;
const HARDMODE = 24;

function createBoard(numFilledCells) {
    let board = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(0));
    let count = 0;

    while (count < numFilledCells) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        const number = Math.floor(Math.random() * GRID_SIZE) + 1;

        if (board[row][col] === 0 && validLocation(board, number, row, col)) {
            board[row][col] = number;
            count++;
        }
    }

    return board;
}

function validLocation(board, chosenNumber, row, column) {
    return (
        !numberCheckerRow(board, chosenNumber, row) &&
        !numberCheckerColumn(board, chosenNumber, column) &&
        !numberCheckerBox(board, chosenNumber, row, column)
    );
}

function numberCheckerRow(board, chosenNumber, row) {
    return board[row].includes(chosenNumber);
}

function numberCheckerColumn(board, chosenNumber, column) {
    for (let i = 0; i < GRID_SIZE; i++) {
        if (board[i][column] === chosenNumber) {
            return true;
        }
    }
    return false;
}

function numberCheckerBox(board, chosenNumber, row, column) {
    const boxRow = Math.floor(row / 3) * 3;
    const boxColumn = Math.floor(column / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxColumn; j < boxColumn + 3; j++) {
            if (board[i][j] === chosenNumber) {
                return true;
            }
        }
    }

    return false;
}

function solveBoard(board) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let column = 0; column < GRID_SIZE; column++) {
            if (board[row][column] === 0) {
                for (let number_attempt = 1; number_attempt <= GRID_SIZE; number_attempt++) {
                    if (validLocation(board, number_attempt, row, column)) {
                        board[row][column] = number_attempt;

                        if (solveBoard(board)) {
                            return true;
                        } else {
                            board[row][column] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function boardToString(board) {
    return board.map(row => row.join('')).join('\n');
}

app.get("/api/sudoku", (req, res) => {
    const difficulty = req.query.difficulty || 'medium'; // Default to medium if no difficulty specified

    let numFilledCells;
    if (difficulty === 'Easy') {
        numFilledCells = EASYMODE;
    } else if (difficulty === 'Hard') {
        numFilledCells = HARDMODE;
    } else {
        numFilledCells = MEDIUMMODE;
    }

    let exampleSudokuBoard;
    let solvedSudokuBoard;

    do {
        exampleSudokuBoard = createBoard(numFilledCells);
        solvedSudokuBoard = JSON.parse(JSON.stringify(exampleSudokuBoard)); // Create a deep copy
    } while (!solveBoard(solvedSudokuBoard));

    const boardString = boardToString(exampleSudokuBoard);
    const solutionString = boardToString(solvedSudokuBoard);

    res.json({ "board": boardString, "solution": solutionString });
});

app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});
