import React, { useState, useEffect } from 'react';
import { Board, Menu } from '..';

const Game = ({ difficulty }) => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameWon, setGameWon] = useState(false); // New state for game win status

  useEffect(() => {
    let interval;
    if (!isPaused && !gameWon) { // Only update time if not paused and game is not won
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
    setIsPaused(true); // Pause the timer when the game is won
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
        />
    <Board difficulty={difficulty} timer={formatTime(time)} onGameWin={handleGameWin} />
    </div>
  );
};

export default Game;
