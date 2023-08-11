import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faCheck } from '@fortawesome/free-solid-svg-icons';

const Menu = ({ difficulty, formattedTime, isPaused, onTogglePause, onSolve }) => {
  return (
    <div className="menu">
      <Link to="/" className="back-button">&lt; Back</Link>
      <div className="timer">
        <p>{formattedTime}</p>
        <button onClick={onTogglePause} className="pause-button">
          {isPaused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
        </button>
      </div>
      <button onClick={onSolve} className="solve-button">
        Solve <span className="solve-icon"><FontAwesomeIcon icon={faCheck} /></span>
      </button>
      <p>{difficulty}</p>
    </div>
  );
};

export default Menu;
