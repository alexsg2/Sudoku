import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      {/* Display the title of the home page */}
      <h1 className="centered-title">Sudoku Game</h1>
      <hr />

      <h2 className='welcome-header'>  Welcome to my Sudoku game! </h2>
      <p className='welcome-message'> Prepare to challenge your mind and enjoy. Choose your preferred difficulty level before we start. </p>

      {/* Display a message to choose a puzzle difficulty */}
      <div className="rounded-rectangle-border">
        <p className="centered-message">Choose Your Puzzle Difficulty:</p>

        <div className="difficulty-buttons">
          <div className="vertical-buttons">

            {/* Use 'Link' components to create buttons with routing */}
            <Link to="/easy" className="rounded-button easy-button">Easy</Link>
            <Link to="/medium" className="rounded-button medium-button">Medium</Link>
            <Link to="/hard" className="rounded-button hard-button">Hard</Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
