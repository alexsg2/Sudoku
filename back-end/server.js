// Import the Express.js framework
const express = require('express');
const app = express();

/**
 * Sudoku Solver:
 * 
 * This backend logic serves as an implementation of a Sudoku solver and puzzle generator. It is based on a Java Sudoku solver 
 * I initially created, adapted here for use with the Express.js framework. The primary purpose of this backend is to generate, 
 * solve, and provide Sudoku puzzles through an API endpoint.
 *
 * Sudoku is a number placement puzzle game where a 9x9 grid is divided into nine 3x3 subgrids (also called "boxes"). 
 * The objective is to fill the grid's cells with digits from 1 to 9 while adhering to certain rules. Each row, column, 
 * and box must contain all numbers from 1 to 9 without repetition.
 *
 * The backend logic encompasses several key functions:
 *
 * - `createBoard(numFilledCells)`: This function generates a random Sudoku puzzle by filling a specified number of cells initially. 
 *    It populates the puzzle's grid with valid numbers while ensuring that each number adheres to the rules of Sudoku.
 * - Number checker functions (`numberCheckerRow`, `numberCheckerColumn`, `numberCheckerBox`): These functions validate whether a 
 *   given number can be placed in a specific row, column, or 3x3 box without violating the Sudoku rules.
 * - `validLocation(board, chosenNumber, row, column)`: This function checks if a specific number can be legally placed at a given 
 *   cell on the Sudoku board, ensuring it doesn't violate the rules.
 * - `solveBoard(board)`: This is a backtracking algorithm that attempts to solve the partially filled Sudoku board by recursively 
 *   filling empty cells with valid numbers.
 * - `boardToString(board)`: This function converts a Sudoku board into a string format for easy printing and display.
 *
 * The Express.js application is configured to provide an API endpoint at "/api/sudoku". When a request is made to this endpoint, 
 * the backend generates Sudoku puzzles of varying difficulty levels (easy, medium, hard). It uses the aforementioned functions to 
 * create, solve, and provide a JSON response containing both the generated puzzle and its solution.
 *
 * The API supports an optional query parameter "difficulty", which allows users to specify the difficulty level of the generated puzzle. 
 * If no difficulty is specified, the backend defaults to generating puzzles of medium difficulty.
 *
 * Overall, this backend showcases the generation and solving of Sudoku puzzles, allowing users to access puzzles through a simple API endpoint.
 * It demonstrates how the familiar rules of Sudoku can be implemented through code to create an interactive and engaging experience.
 */

// Define constants for grid size and difficulty levels
const GRID_SIZE = 9;
const EASYMODE = 36;
const MEDIUMMODE = 30;
const HARDMODE = 24;

/**
 * Creates a randomly generated board with a specified number of filled cells.
 * 
 * @param {number} numFilledCells The number of cells to be filled initially.
 * @return {number[][]} The generated Sudoku board.
 */
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

 /**
 * Checks whether a given number is present in the same row.
 * 
 * @param board The Sudoku board.
 * @param chosenNumber The number to be checked.
 * @param row The row to be checked.
 * @return True if the number is present in the row, false otherwise.
*/
function numberCheckerRow(board, chosenNumber, row) {
    return board[row].includes(chosenNumber);
}

 /**
 * Checks whether a given number is present in the same column.
 * 
 * @param board The Sudoku board.
 * @param chosenNumber The number to be checked.
 * @param column The column to be checked.
 * @return True if the number is present in the column, false otherwise.
*/
function numberCheckerColumn(board, chosenNumber, column) {
    for (let i = 0; i < GRID_SIZE; i++) {
        if (board[i][column] === chosenNumber) {
            return true;
        }
    }
    return false;
}

 /**
 * Checks whether a given number is present in the same 3x3 box.
 * 
 * @param board The Sudoku board.
 * @param chosenNumber The number to be checked.
 * @param row The row of the cell.
 * @param column The column of the cell.
 * @return True if the number is present in the box, false otherwise.
*/
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

 /**
 * Checks whether a given number can be legally placed at a specific cell.
 * Does this by checking each classes check to ensure its correct.
 * 
 * @param board The Sudoku board.
 * @param chosenNumber The number to be placed.
 * @param row The row of the cell.
 * @param column The column of the cell.
 * @return True if the number can be placed at the cell, false otherwise.
 */
function validLocation(board, chosenNumber, row, column) {
    return (
        !numberCheckerRow(board, chosenNumber, row) &&
        !numberCheckerColumn(board, chosenNumber, column) &&
        !numberCheckerBox(board, chosenNumber, row, column)
    );
}

/**
 * Solves the Sudoku puzzle using a backtracking algorithm.
 * 
 * @param board The Sudoku board to be solved.
 * @return True if a solution is found, false otherwise.
 */
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

/**
 * Converts a board to a string format.
 * 
 * @param {number[][]} board The Sudoku board to be converted.
 * @return {string} The board in string format.
 */
function boardToString(board) {
    return board.map(row => row.join('')).join('\n');
}

// Express API endpoint to generate and return Sudoku boards
app.get("/api/sudoku", (req, res) => {
    // Default to medium if no difficulty specified
    const difficulty = req.query.difficulty || 'medium'; 

    let numFilledCells;

    // Set the number of filled cells based on the chosen difficulty level
    if (difficulty === 'Easy') {
        numFilledCells = EASYMODE;
    } else if (difficulty === 'Hard') {
        numFilledCells = HARDMODE;
    } else {
        numFilledCells = MEDIUMMODE;
    }

    let exampleSudokuBoard;
    let solvedSudokuBoard;

    // Generate boards until a solvable one is found
    do {
        exampleSudokuBoard = createBoard(numFilledCells);
        solvedSudokuBoard = JSON.parse(JSON.stringify(exampleSudokuBoard)); // Create a deep copy
    } while (!solveBoard(solvedSudokuBoard));

    const boardString = boardToString(exampleSudokuBoard);
    const solutionString = boardToString(solvedSudokuBoard);

    // Send the generated board and its solution as a JSON response
    res.json({ "board": boardString, "solution": solutionString });
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});
