import React from 'react';
import { Game } from '..'; 

const Hardmode = () => {
  return (
    <div>
      {/* Render the 'Game' component with a 'difficulty' prop set to "Hard" */}
      <Game difficulty="Hard" />
    </div>
  );
};

export default Hardmode;
