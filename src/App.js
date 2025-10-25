// App.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Timer from './Components/Timer';
import Header from './Components/Header';
import TaskList from './Components/Tasklist';

function App() {
  const [pomodoroDuration, setPomodoroDuration] = useState(25 * 60); // 25 menit
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60); // 5 menit
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); // 15 menit
  const [currentMode, setCurrentMode] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration);
  const [showNotification, setShowNotification] = useState(false);
  const timerIntervalRef = useRef(null);

  // State untuk warna latar belakang
  const [bgColor, setBgColor] = useState('#DA4F41'); // Warna default Pomodoro

  // Efek untuk mengubah warna latar belakang berdasarkan mode
  useEffect(() => {
    switch (currentMode) {
      case 'pomodoro':
        setBgColor('#DA4F41'); // Merah
        break;
      case 'shortBreak':
        setBgColor('#2A9D8F'); // Cyan Hijau Tua (Teal)
        break;
      case 'longBreak':
        setBgColor('#264653'); // Biru Tua (Dark Blue)
        break;
      default:
        setBgColor('#DA4F41');
    }
  }, [currentMode]);

  // Fungsi untuk memainkan suara (opsional)
  const playSound = () => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.play().catch(e => console.log("Audio playback failed:", e));
  };

  useEffect(() => {
    // Atur waktu awal berdasarkan mode saat ini
    switch (currentMode) {
      case 'pomodoro':
        setRemainingTime(pomodoroDuration);
        break;
      case 'shortBreak':
        setRemainingTime(shortBreakDuration);
        break;
      case 'longBreak':
        setRemainingTime(longBreakDuration);
        break;
      default:
        setRemainingTime(pomodoroDuration);
    }
    // Hentikan timer jika mode berubah saat sedang berjalan
    if (isPlaying) {
      clearInterval(timerIntervalRef.current);
      setIsPlaying(false);
    }
  }, [currentMode, pomodoroDuration, shortBreakDuration, longBreakDuration]);

  const startTimer = () => {
    setIsPlaying(true);
    timerIntervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          setIsPlaying(false);
          playSound();
          setShowNotification(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
    clearInterval(timerIntervalRef.current);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    clearInterval(timerIntervalRef.current);
    switch (currentMode) {
      case 'pomodoro':
        setRemainingTime(pomodoroDuration);
        break;
      case 'shortBreak':
        setRemainingTime(shortBreakDuration);
        break;
      case 'longBreak':
        setRemainingTime(longBreakDuration);
        break;
      default:
        setRemainingTime(pomodoroDuration);
    }
    setShowNotification(false);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const continueToNextMode = () => {
    setShowNotification(false);
    switch (currentMode) {
      case 'pomodoro':
        setCurrentMode('shortBreak');
        setRemainingTime(shortBreakDuration);
        break;
      case 'shortBreak':
        setCurrentMode('pomodoro');
        setRemainingTime(pomodoroDuration);
        break;
      case 'longBreak':
        setCurrentMode('pomodoro');
        setRemainingTime(pomodoroDuration);
        break;
      default:
        setCurrentMode('pomodoro');
        setRemainingTime(pomodoroDuration);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <Header />
      <div className="timer-container">
        <div className="mode-switcher">
          <button
            className={`mode-button ${currentMode === 'pomodoro' ? 'active pomodoro' : ''}`}
            onClick={() => setCurrentMode('pomodoro')}
          >
            Pomodoro
          </button>
          <button
            className={`mode-button ${currentMode === 'shortBreak' ? 'active shortBreak' : ''}`}
            onClick={() => setCurrentMode('shortBreak')}
          >
            Short Break
          </button>
          <button
            className={`mode-button ${currentMode === 'longBreak' ? 'active longBreak' : ''}`}
            onClick={() => setCurrentMode('longBreak')}
          >
            Long Break
          </button>
        </div>
        <Timer remainingTime={remainingTime} />

        {showNotification && (
          <div className="notification-overlay">
            <div className="notification-box">
              <h3>⏱️ Time's Up!</h3>
              <p>{currentMode === 'pomodoro' ? "You've completed a Pomodoro session!" : "Your break is over!"}</p>
              <div className="notification-actions">
                <button onClick={continueToNextMode}>
                  {currentMode === 'pomodoro' ? 'Start Short Break' : 'Continue Working'}
                </button>
                <button onClick={closeNotification}>Dismiss</button>
              </div>
            </div>
          </div>
        )}

        <div className="timer-controls">
          <button onClick={isPlaying ? pauseTimer : startTimer}>
            {isPlaying ? 'PAUSE' : 'START'}
          </button>
          <button onClick={resetTimer}>RESET</button>
        </div>
      </div>
      <TaskList />
    </div>
  );
}

export default App;