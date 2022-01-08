import React from "react";
import useTimer from "usetimer-react";

const GuestMode = () => {
  const {
    startTimer,
    stopTimer,
    setTimerDuration,
    countdown,
    details,
    timeLeft,
  } = useTimer();

  return (
    <div>
      Hello
      <h1>
        {countdown.mins}:{countdown.secs}
      </h1>
      <div>
        <button
          onClick={() => {
            setTimerDuration(60);
          }}
        >
          Set Duration (60)
        </button>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
      </div>
      <p>Start Time: {details.startTime}</p>
      <p>End Time: {details.endTime}</p>
      <p>Time Left: {timeLeft}</p>
      <p></p>
    </div>
  );
};

export default GuestMode;
