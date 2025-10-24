// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Timer from './Components/Timer';
import Header from './Components/Header';
// import Settings from './components/Settings'; // Akan ditambahkan nanti
// import TaskList from './components/TaskList'; // Akan ditambahkan nanti

function App() {
  const [pomodoroDuration, setPomodoroDuration] = useState(25 * 60); // 25 menit
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60); // 5 menit
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); // 15 menit
  const [currentMode, setCurrentMode] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration);
  const timerIntervalRef = useRef(null);

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
          // TODO: Implement next mode logic and notifications
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Setiap 1 detik
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
  };

  return (
    <div className="App">
      <Header />
      <div className="timer-container">
        <div className="mode-switcher">
          <button
            className={currentMode === 'pomodoro' ? 'active' : ''}
            onClick={() => setCurrentMode('pomodoro')}
          >
            Pomodoro
          </button>
          <button
            className={currentMode === 'shortBreak' ? 'active' : ''}
            onClick={() => setCurrentMode('shortBreak')}
          >
            Short Break
          </button>
          <button
            className={currentMode === 'longBreak' ? 'active' : ''}
            onClick={() => setCurrentMode('longBreak')}
          >
            Long Break
          </button>
        </div>
        <Timer remainingTime={remainingTime} />
        <div className="timer-controls">
          <button onClick={isPlaying ? pauseTimer : startTimer}>
            {isPlaying ? 'PAUSE' : 'START'}
          </button>
          <button onClick={resetTimer}>RESET</button>
        </div>
      </div>
      {/* <Settings /> */}
      {/* <TaskList /> */}
    </div>
  );
}

export default App;