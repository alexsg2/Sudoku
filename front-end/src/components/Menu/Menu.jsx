import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faCheck } from '@fortawesome/free-solid-svg-icons';


const Menu = ({ difficulty, formattedTime, isPaused, onTogglePause, onSolve, gameWon }) => {
  return (
    <div className="menu">
      <Link to="/" className="back-button">&lt; Back</Link>

      {/*  Checks if Game has been won */}
      {gameWon ? (
        // Display when the game is won
        <div className="timer">
          <p>{formattedTime}</p>
          <button onClick={onTogglePause} className="static-button">
            <FontAwesomeIcon icon={faPlay}/>
          </button>
        </div>
      ) : (
        // Display during an ongoing game
        <div className="timer">
          <p>{formattedTime}</p>
          <button onClick={onTogglePause} className="pause-button">
            {isPaused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
          </button>
        </div>
      )}


      {/* Button to solve the puzzle, disabled when the game is won */}
      <button onClick={onSolve} className="solve-button" disabled={gameWon}>
        Solve <span className="solve-icon"><FontAwesomeIcon icon={faCheck} /></span>
      </button>

      {isPaused && !gameWon? (
        <button className="refresh-button">
          &#x21BB;
        </button>
      ) : (
        <button className="refresh-button" onClick={() => window.location.reload()}>
          &#x21BB;
        </button>
      )}

      {/* Display the game difficulty */}
      <p>{difficulty}</p>
    </div>
  );
};

export default Menu;