import React, { useState, useEffect } from 'react';
import './Board.css';
import { VictoryMessage} from '..'; 


function Board({ difficulty, timer, onGameWin, solveClick, backendData }) {
  const [numSelected, setNumSelected] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  // Use the backend data to initialize initialBoard and solution
  const initialBoard = backendData.board.split('\n').map(row => row.split('').map(cell => cell === '0' ? cell : parseInt(cell)));
  const solution = backendData.solution.split('\n').map(row => row.split('').map(cell => parseInt(cell)));

  // Initialize board state using initialBoard
  const [board, setBoard] = useState([...initialBoard]);


  useEffect(() => {
    function solvePuzzle() {
      if (gameWon) {
        return;
      }
    
      const newBoard = JSON.parse(JSON.stringify(board));
  
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          console.log(`Cell [${r}][${c}] is correct. Expected: ${solution[r][c]}, Actual: ${newBoard[r][c]}`);
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
  
    if (solveClick) {
      solvePuzzle();
    }
  }, [solveClick, gameWon, board, onGameWin, solution, initialBoard]);         
      

    function setGame() {
        const boardElements = [];
      
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            const tileId = `${r}-${c}`;
            const cellValue = board[r][c];
            const isGivenNumber = initialBoard[r][c] !== '0';
            const isIncorrect = cellValue !== solution[r][c] && cellValue !== '0';
      
            const tileClass = `tile ${
              isGivenNumber ? 'given-number' : ''
            } ${
              r === 2 || r === 5 ? 'horizontal_line' : ''
            } ${
              c === 2 || c === 5 ? 'vertical_line' : ''
            } ${
              numSelected !== null && r === numSelected[0] && c === numSelected[1] ? 'number-selected' : ''
            } ${
              isIncorrect ? 'incorrect' : '' // Add this class for incorrect cells
            }`;
      
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

function selectNumber(number) {
    if (gameWon) {
        // Clear selected number and its highlight
        if (numSelected !== null) {
            document.getElementById(numSelected.toString()).classList.remove("number-selected");
        }
        setNumSelected(null);
        return;
    }
    
    if (numSelected !== null) {
        document.getElementById(numSelected.toString()).classList.remove("number-selected");
    }

    // Toggle selection if the same number is clicked again
    if (numSelected === number) {
        setNumSelected(null);
    } else {
        document.getElementById(number.toString()).classList.add("number-selected");
        setNumSelected(number);
    }
}

function selectTile(row, col) {
    if (gameWon) {
        return;
    }

    const isGivenNumber = typeof initialBoard[row][col] === 'number';

    if (numSelected !== null && !isGivenNumber) {
        const newBoard = [...board];
        newBoard[row][col] = numSelected === 0 ? " " : numSelected;

        setBoard(newBoard);

        console.log("Before isBoardSolved:", JSON.stringify(newBoard)); // Debugging line
        console.log("solution:", JSON.stringify(solution)); // Debugging line

        if (isBoardSolved(newBoard)) {
            setGameWon(true);
            onGameWin(true);
        }

    } else if (!isGivenNumber && numSelected !== null) {
        const newBoard = [...board];
        newBoard[row][col] = numSelected === 0 ? " " : numSelected;

        console.log("Before isBoardSolved:", JSON.stringify(newBoard)); // Debugging line
        console.log("solution:", JSON.stringify(solution)); // Debugging line

        setBoard(newBoard);

        if (isBoardSolved(newBoard)) {
            setGameWon(true);
            onGameWin(true);
        }
    }
}

  function isBoardSolved(testBoard) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const boardValue = testBoard[r][c];
        const solutionValue = solution[r][c];
  
        if (boardValue !== solutionValue) {
          return false;
        }
      }
    }
    return true;
  }

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

            <div>
              <pre>{solution.map(row => row.join(' ')).join('\n')}</pre>
            </div>

            {gameWon ? (
              <VictoryMessage difficulty={difficulty} time={timer} onPlayAgain={() => window.location.reload()}  />
            ) : null} 
        </div>
    );
}

export default Board;