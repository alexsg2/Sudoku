  import React, { useState, useEffect, useRef } from 'react';
  import { Board, Menu } from '..';
  import "./Game.css"

  const Game = ({ difficulty }) => {
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [solveClick, setSolveClick] = useState(false);
    const [backendData, setBackendData] = useState({ board: '', solution: '' });
    const isLoading = backendData.board === '' || backendData.solution === '';

    // Use useRef to keep track of whether data is being fetched
  const isFetchingData = useRef(false);

  // Data fetching effect
  useEffect(() => {
    if (!isFetchingData.current) {
      isFetchingData.current = true;

      fetch(`/api/sudoku?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
          console.log("Received Backend Data:", data);
          setBackendData(data);
        });
    }
  }, [difficulty]);

  // Timer interval effect
  useEffect(() => {
    let interval;

    if (!isPaused && !gameWon) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, gameWon]);

    const formatTime = (totalSeconds) => {
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
    };

    const handlePauseToggle = () => {
      setIsPaused(prevPaused => !prevPaused);
    };

    const handleGameWin = () => {
      setGameWon(true);
      setIsPaused(true);
    };

    const handleSolve = () => {
      setSolveClick(true);
    };

    const handleSolvePuzzle = () => {
      if (solveClick) {
        setSolveClick(false);
      }
    };

    return (
      <div>
        <h1 className="centered-title">Sudoku Game</h1>
        <hr />
        <Menu
          difficulty={difficulty}
          formattedTime={formatTime(time)}
          isPaused={isPaused}
          onTogglePause={handlePauseToggle}
          gameWon={gameWon}
          onSolve={handleSolve}
          solveClick={solveClick}
        />

        {isLoading ? (
          <div className="loading-container">
            <p>Loading . . .</p>
          </div>
        ) : (
          <>
            <Board
              difficulty={difficulty}
              timer={formatTime(time)}
              onGameWin={handleGameWin}
              solveClick={solveClick}
              solvePuzzle={handleSolvePuzzle}
              backendData={backendData}
            />
          </>
        )}
      </div>
    );
  };

  export default Game;
