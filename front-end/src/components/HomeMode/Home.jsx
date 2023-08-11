import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h1 className="centered-title">Sudoku Game</h1>
      <hr />

      <p className="centered-message">Choose Your Puzzle Difficulty:</p>

      <div className="difficulty-buttons">
        <div className="vertical-buttons">
          <Link to="/easy" className="rounded-button easy-button">Easy</Link>
          <Link to="/medium" className="rounded-button medium-button">Medium</Link>
          <Link to="/hard" className="rounded-button hard-button">Hard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
