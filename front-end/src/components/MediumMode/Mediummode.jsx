import React from 'react';
import { Game } from '..'; 

const Mediummode = () => {
  return (
    <div>
      {/* Render the 'Game' component with a 'difficulty' prop set to "Medium" */}
      <Game difficulty="Medium" />
    </div>
  );
};

export default Mediummode;
