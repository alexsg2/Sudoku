import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import "./PausedMessage.css";

const PauseMessage = () => {
  return (
    <div className="pause-message">
        <div className="pause-emoji"><FontAwesomeIcon icon={faPause} /></div>
        <div className="pause-text">
            <p>Your Game is Paused!</p>
            <p>Please Unpause to Continue . . .</p>
        </div>
    </div>
  )
}

export default PauseMessage;