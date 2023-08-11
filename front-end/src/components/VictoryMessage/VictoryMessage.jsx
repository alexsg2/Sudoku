import React from 'react';
import "./VictoryMessage.css"

const VictoryMessage = ({ time, onPlayAgain }) => {
  return (
    <div className="victory-message">
      <div className="trophy-emoji">🏆</div>
      <div className="congrats-text">
        <p>Congratulations!</p>
        <p>You finished the puzzle in: { time } </p>
      </div>
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Another Sudoku
      </button>
    </div>
  );
};

export default VictoryMessage;
