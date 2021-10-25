import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

function App() {
  const [timerMin, setTimerMin] = useState("00");
  const [timerSec, setTimerSec] = useState("00");
  const [phase, setPhase] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const progressBar = useRef(null);
  const [playing, toggle] = useAudio(
    "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"
  );

  const clearTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const setCurrPhase = (phase) => {
    clearTimer();
    setPhase(phase);
    setTimerMin("00");
    setTimerSec("00");
    setAnimation();
  };

  const setAnimation = (duration) => {
    console.log(duration);
    if (duration)
      progressBar.current.style.animation = `reduceWidth ease-in-out ${String(
        duration
      )}s`;
    else {
      progressBar.current.style.animation = "";
    }
  };

  const startTimer = () => {
    clearTimer();
    setAnimation();
    let duration;

    if (phase === "1" || phase === "3") {
      duration = 60 * 25;
    } else if (phase === "2" || phase === "4") {
      duration = 60 * 5;
    } else {
      alert("Please Select a Phase.");
      return;
    }

    var timer = duration,
      minutes,
      seconds;

    setAnimation(duration);
    let id = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimerMin(minutes);
      setTimerSec(seconds);

      if (--timer < 0) {
        clearInterval(id);
        if (playing) {
          toggle();
          toggle();
        } else {
          toggle();
        }
        clearTimer();
        setAnimation();
      }
    }, 1000);

    setTimerId(id);
  };

  return (
    <div className="App">
      <h1>Pomodoro</h1>

      <div className="btns">
        <div onClick={startTimer} className="btn_start">
          <i className="fas fa-play"></i>
          <p>Start</p>
        </div>
        {/* <div className="btn_pause">
          <i className="fas fa-pause"></i>
          <p>Pause</p>
        </div> */}
        <div
          onClick={() => {
            setCurrPhase(null);
          }}
          className="btn_redo"
        >
          <i className="fas fa-redo"></i>
          <p>Reset</p>
        </div>
      </div>
      <div className="giant_timer">
        <h2>
          {timerMin}:{timerSec}
        </h2>
        <div className="progress_bar_container">
          <div className="progress_bar" ref={progressBar}></div>
        </div>
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
      <p className="footer">
        &copy; Abhin Rustagi | 2021.
        <br />
        <a href="https://www.abhinrustagi.xyz">www.abhinrustagi.xyz</a>
      </p>
    </div>
  );
}

export default App;
