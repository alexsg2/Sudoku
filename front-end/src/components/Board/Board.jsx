import React, { useState, useEffect } from 'react';
import './Board.css';
import { VictoryMessage, SudokuDifficulty } from '..'; 

var initialBoard = [
  "803004271",
  "005210486",
  "000000300",
  "700000025",
  "516780030",
  "000000008",
  "300520647",
  "600800000",
  "009007013",
];

var solution = [
  "863954271",
  "975213486",
  "124678359",
  "798346125",
  "516782934",
  "432195768",
  "381529647",
  "647831592",
  "259467813",
];


function Board({ difficulty, timer, onGameWin, solveClick }) {
    const [numSelected, setNumSelected] = useState(null);
    const [gameWon, setGameWon] = useState(false);
    const [board, setBoard] = useState([...initialBoard]);

    useEffect(() => {
      function solvePuzzle() {
        if (gameWon) {
          return;
        }
      
        const newBoard = [...board];
      
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (newBoard[r][c] === '0' || newBoard[r][c] !== solution[r][c]) {
              newBoard[r] = newBoard[r].substr(0, c) + solution[r][c] + newBoard[r].substr(c + 1);
      
              // Add a class to mark the digit as red for cells filled by solvePuzzle
              if (!initialBoard[r][c] !== '0') {
                document.getElementById(`${r}-${c}`).classList.add('solved-red');
              }
            }
          }
        }
      
        setBoard(newBoard);
        setGameWon(true);
        onGameWin(true);
      }          
  
      if (solveClick) {
        solvePuzzle(); // Call the solvePuzzle function
      }
    }, [solveClick, gameWon, board, onGameWin]);

    function setGame() {
      const boardElements = [];
    
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const tileId = `${r}-${c}`;
          const cellValue = board[r][c];
          const isGivenNumber = initialBoard[r][c] !== '0'; // Use initialBoard here
    
          const tileClass = `tile ${
            isGivenNumber ? 'given-number' : ''
          } ${
            r === 2 || r === 5 ? 'horizontal_line' : ''
          } ${
            c === 2 || c === 5 ? 'vertical_line' : ''
          } ${
            numSelected !== null && r === numSelected[0] && c === numSelected[1] ? 'number-selected' : ''
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
  
    const isGivenNumber = initialBoard[row][col] !== '0';
  
    if (numSelected !== null && !isGivenNumber) {
      const newBoard = [...board];
      if (numSelected === ' ') {
        newBoard[row] = newBoard[row].substr(0, col) + '0' + newBoard[row].substr(col + 1);
      } else {
        newBoard[row] = newBoard[row].substr(0, col) + numSelected.toString() + newBoard[row].substr(col + 1);
      }
  
      if (isBoardSolved(newBoard)) {
        setGameWon(true);
        onGameWin(true);
      }
  
      setBoard(newBoard);
    } else if (!isGivenNumber && numSelected !== null) {
      const newBoard = [...board];
      newBoard[row] = newBoard[row].substr(0, col) + numSelected.toString() + newBoard[row].substr(col + 1);
  
      if (isBoardSolved(newBoard)) {
        setGameWon(true);
      }
  
      setBoard(newBoard);
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
            {gameWon ? (
              <VictoryMessage difficulty={difficulty} time={timer} onPlayAgain={() => window.location.reload()}  />
            ) : null} 

            <SudokuDifficulty difficulty={difficulty} />
        </div>
    );
}

export default Board;