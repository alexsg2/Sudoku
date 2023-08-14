  import React, { useState, useEffect, useRef } from 'react';
  import { Board, Menu } from '..';
  import "./Game.css"

  const Game = ({ difficulty }) => {

    // State variables to manage game state
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [solveClick, setSolveClick] = useState(false);
    const [backendData, setBackendData] = useState({ board: '', solution: '' });
    const isLoading = backendData.board === '' || backendData.solution === '';

    const isFetchingData = useRef(false);

    // Effect to fetch backend data based on difficulty
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

          // Increment time every second
          setTime(prevTime => prevTime + 1);

        }, 1000);
      }

      return () => clearInterval(interval);
    }, [isPaused, gameWon]);

    // Format time in HH:MM:SS format
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
      } 
      else if (minutes > 0) {
        return formattedMinutes + ":" + formattedSeconds;
      } 
      else {
        if (seconds >= 10) {
          return "0:" + seconds;
        } 
        else {
          return "0.0" + seconds;
        }
      }
    };

    // Handles pause/play toggle
    const handlePauseToggle = () => {
      setIsPaused(prevPaused => !prevPaused);
    };

    // Handles game win
    const handleGameWin = () => {
      setGameWon(true);
      setIsPaused(true);
    };

    // Handles solve button click
    const handleSolve = () => {
      if (!isPaused)
      {
        setSolveClick(true);
      }
    };

    // Handles solve puzzle action
    const handleSolvePuzzle = () => {
      if (solveClick) {
        // Reset solve click state
        setSolveClick(false);
      }
    };

    return (
      <div>
        {/* Render Title */}
        <h1 className="centered-title">Sudoku Game</h1>
        <hr />

        {/* Render Menu */}
        <Menu
          difficulty={difficulty}
          formattedTime={formatTime(time)}
          isPaused={isPaused}
          onTogglePause={handlePauseToggle}
          gameWon={gameWon}
          onSolve={handleSolve}
          solveClick={solveClick}
        />

        {/* Render Board - When Generating put loading Screen */}
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
              isPaused={isPaused}
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
