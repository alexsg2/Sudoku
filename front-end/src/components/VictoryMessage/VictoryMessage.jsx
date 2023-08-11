import React, { useState } from 'react';
import './VictoryMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const VictoryMessage = ({ difficulty, time, onPlayAgain }) => {
  const [isVictoryOpen, setIsVictoryOpen] = useState(true); // State to track if the victory message is open

  // Function to close the victory message
  const closeVictoryMessage = () => {
    setIsVictoryOpen(false);
  };

  // Render the victory message only if it's open
  return isVictoryOpen ? (
    <div className="victory-message">
      <div className="close-button" onClick={closeVictoryMessage}> {/* Added click event */}
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="trophy-emoji">🏆</div>
      <div className="congrats-text">
        <p>Congratulations!</p>
        <p>You finished the {difficulty} Puzzle in: {time} </p>
      </div>
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Another Sudoku
      </button>
    </div>
  ) : null; // Don't render if the victory message is closed
};

export default VictoryMessage;
