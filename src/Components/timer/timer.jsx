import React, { useState, useEffect } from "react";
import "./timer.css";

const CountdownTimer = () => {
  const targetDate = new Date("February 28, 2025 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="timer">
      <div className="timer-inner">
        <div className="timer-title">Zenith 2025 Countdown</div>
        <div className="timer-content">
          <div className="timer-box">
            <p className="glow">{days}</p>
            <span>Days</span>
          </div>
          <div className="timer-box">
            <p className="glow">{hours}</p>
            <span>Hours</span>
          </div>
          <div className="timer-box">
            <p className="glow">{minutes}</p>
            <span>Minutes</span>
          </div>
          <div className="timer-box">
            <p className="glow">{seconds}</p>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
