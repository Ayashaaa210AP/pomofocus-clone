// components/Timer.js
import React from 'react';
import './Timer.css';

function Timer({ remainingTime }) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="timer">
      <span className="time-display">
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
}

export default Timer;