import React, { useEffect, useState } from 'react';

function SudokuDifficulty({ difficulty }) {
  const [backendData, setBackendData] = useState({ board: '', solution: '' });

  const isLoading = backendData.board === '' || backendData.solution === '';

  useEffect(() => {
    fetch(`/api/sudoku?difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        console.log("Received Backend Data:", data);
        setBackendData(data);
      });
  }, [difficulty]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <h2>Sudoku Board:</h2>
            <pre>{backendData.board}</pre>
          </div>
          <div>
            <h2>Sudoku Solution:</h2>
            <pre>{backendData.solution}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default SudokuDifficulty;
