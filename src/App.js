import React, { useState } from "react";
import "./App.css";

function App() {
  const [timerMin, setTimerMin] = useState("00");
  const [timerSec, setTimerSec] = useState("00");
  const [phase, setPhase] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const clearTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const setCurrPhase = (phase) => {
    clearTimer();
    setPhase(phase);
    setTimerMin("00");
    setTimerSec("00");
  };

  const startTimer = () => {
    clearTimer();
    let duration;

    if (phase === "1" || phase === "3") {
      duration = 60 * 25;
    } else if (phase === "2" || phase === "4") {
      duration = 60 * 5;
    }

    var timer = duration,
      minutes,
      seconds;

    let id = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimerMin(minutes);
      setTimerSec(seconds);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);

    setTimerId(id);
  };

  return (
    <div className="App">
      <h1>Pomodoro</h1>

      <div className="btns">
        <div onClick={startTimer} className="btn_start">
          <i class="fas fa-play"></i>
          <p>Start</p>
        </div>
        {/* <div className="btn_pause">
          <i class="fas fa-pause"></i>
          <p>Pause</p>
        </div> */}
        <div
          onClick={() => {
            setCurrPhase(null);
          }}
          className="btn_redo"
        >
          <i class="fas fa-redo"></i>
          <p>Reset</p>
        </div>
      </div>
      <div className="giant_timer">
        <h2>
          {timerMin}:{timerSec}
        </h2>
      </div>
      <div className="phases">
        <div
          onClick={() => {
            setCurrPhase("1");
          }}
          className={`phase phase1 ${phase === "1" ? "current" : null}`}
        >
          <h4>Pomodoro 1</h4>
          <p>25 minutes</p>
        </div>
        <div
          onClick={() => {
            setCurrPhase("2");
          }}
          className={`phase phase2 ${phase === "2" ? "current" : null}`}
        >
          <h4>Break</h4>
          <p>5 minutes</p>
        </div>
        <div
          onClick={() => {
            setCurrPhase("3");
          }}
          className={`phase phase3 ${phase === "3" ? "current" : null}`}
        >
          <h4>Pomodoro 2</h4>
          <p>25 minutes</p>
        </div>
        <div
          onClick={() => {
            setCurrPhase("4");
          }}
          className={`phase phase4 ${phase === "4" ? "current" : null}`}
        >
          <h4>Break</h4>
          <p>5 minutes</p>
        </div>
      </div>
    </div>
  );
}

export default App;
