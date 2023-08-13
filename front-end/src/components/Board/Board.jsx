import React, { useState, useEffect } from 'react';
import './Board.css';
import { VictoryMessage} from '..'; 


function Board({ difficulty, timer, onGameWin, solveClick, backendData }) {

  // Use the backend data to initialize initialBoard and solution
  const initialBoard = backendData.board.split('\n').map(row => row.split('').map(cell => cell === '0' ? cell : parseInt(cell)));
  const solution = backendData.solution.split('\n').map(row => row.split('').map(cell => parseInt(cell)));

  const [numSelected, setNumSelected] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [board, setBoard] = useState([...initialBoard]);


  useEffect(() => {

    // Call solvePuzzle() if solveClick is true
    if (solveClick) {
      solvePuzzle();
    }

    // Function to solve the puzzle when the solveClick prop changes
    function solvePuzzle() {
      if (gameWon) {
        return;
      }
    
      const newBoard = JSON.parse(JSON.stringify(board));
  
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

          // Check if the cell is correct, highlight incorrect cells
          if (newBoard[r][c] !== solution[r][c]) {
            console.log(`Different`);
            document.getElementById(`${r}-${c}`).classList.add('solved-red');
            newBoard[r][c] = solution[r][c];
          }
        }
      }
  
      setBoard(newBoard);
      setGameWon(true);
      onGameWin(true);
    }
  }, [solveClick, gameWon, board, onGameWin, solution, initialBoard]);         
      
  // Function to generate the game board onto the screen
  function setGame() {

      const boardElements = [];
    
      // Loop through rows and columns
      for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            const tileId = `${r}-${c}`;
            const cellValue = board[r][c];
            const isGivenNumber = initialBoard[r][c] !== '0';
      
            // Calculate CSS classes for styling
            const tileClass = `tile ${
              isGivenNumber ? 'given-number' : ''
            } ${
              r === 2 || r === 5 ? 'horizontal_line' : ''
            } ${
              c === 2 || c === 5 ? 'vertical_line' : ''
            } ${
              numSelected !== null && r === numSelected[0] && c === numSelected[1] ? 'number-selected' : ''
            }`;
      
            // Push tile element to array
            boardElements.push(
              <div
                key={tileId}
                id={tileId}
                className={tileClass}
                onClick={() => selectTile(r, c)}
              >
                {cellValue !== '0' ? cellValue : ''}
              </div>
            );
          }
      }
    
      return boardElements;
    }      

  // Function to handle number selection in the UI
  function selectNumber(number) {

      if (gameWon) {
          // Clear selected number and its highlight if the game is already won
          if (numSelected !== null) {
              document.getElementById(numSelected.toString()).classList.remove("number-selected");
          }
          setNumSelected(null);
          return;
      }
      
      if (numSelected !== null) {
          // Clear highlight of the previously selected number
          document.getElementById(numSelected.toString()).classList.remove("number-selected");
      }

      // Toggle selection if the same number is clicked again
      if (numSelected === number) {
        // Deselect the number
        setNumSelected(null);
      } 
      else {
          // Highlight the clicked number and update the selected number state
          document.getElementById(number.toString()).classList.add("number-selected");
          setNumSelected(number);
      }
  }

  // Function to handle cell selection on the game board
  function selectTile(row, col) {
    if (gameWon) {
      // Do nothing if the game is already won
      return;
    }

    const isGivenNumber = typeof initialBoard[row][col] === 'number';

    if (numSelected !== null && !isGivenNumber) {
        // If a number is selected and the cell is not a given number, update the cell value
        const newBoard = [...board];
        newBoard[row][col] = numSelected === 0 ? " " : numSelected;

        setBoard(newBoard);

        // If the board is solved, set gameWon to true and trigger the onGameWin callback
        if (isBoardSolved(newBoard)) {
            setGameWon(true);
            onGameWin(true);
        }

    } 
    else if (!isGivenNumber && numSelected !== null) {
        // If a number is selected and the cell is not a given number, update the cell value
        const newBoard = [...board];
        newBoard[row][col] = numSelected === 0 ? " " : numSelected;

        setBoard(newBoard);

        // If the board is solved, set gameWon to true and trigger the onGameWin callback
        if (isBoardSolved(newBoard)) {
            setGameWon(true);
            onGameWin(true);
        }
    }
  }

  // Function to check if a game board is solved
  function isBoardSolved(testBoard) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const boardValue = testBoard[r][c];
        const solutionValue = solution[r][c];
  
        if (boardValue !== solutionValue) {
           // If any cell doesn't match the solution, return false
          return false;
        }
      }
    }
    // If all cells match the solution, return true
    return true;
  }

  // Render the game board, number selection, and victory message
  return (
      <div>
          <div id="board">{setGame()}</div>
          <div id="digits">
              {[' ', 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <div
                    key={number}
                    id={number}
                    className="number"
                    onClick={() => selectNumber(number === ' ' ? ' ' : parseInt(number))}
                  >
                    {number}
                </div>   
              ))}
          </div>

          {/* Render the 'VictoryMessage' component if the game is won */}
          {gameWon ? (
            <VictoryMessage difficulty={difficulty} time={timer} onPlayAgain={() => window.location.reload()}  />
          ) : null} 
      </div>
  );
}

export default Board;