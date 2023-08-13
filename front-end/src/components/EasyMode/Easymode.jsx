import React from 'react';
import { Game } from '..'; 

const Easymode = () => {
  return (
    <div>
      {/* Render the 'Game' component with a 'difficulty' prop set to "Easy" */}
      <Game difficulty="Easy" />
    </div>
  );
};

export default Easymode;
