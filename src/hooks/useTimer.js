import { useState } from "react";

function useTimer() {
  const [timeRemaining, setTimeRemaining] = useState({
    inNoOfSeconds: 0,
    mins: "00",
    secs: "00",
  });
  const [status, setStatus] = useState("OFF");

  const convertToString = (value) => {
    return value < 10 ? "0" + String(value) : String(value);
  };

  async function startTimer(duration, exitFunc) {
    if (duration === null) {
      throw new Error("Please set a duration for the timer.");
    }

    let timer = duration;
    setStatus("ON");

    let id = setInterval(() => {
      setTimeRemaining({
        ...timeRemaining,
        inNoOfSeconds: timer,
        mins: convertToString(parseInt(timer / 60, 10)),
        secs: convertToString(parseInt(timer % 60, 10)),
      });

      if (--timer < 0) {
        clearTimer(id, exitFunc);
      }
    }, 1000);

    return { id, message: "Timer Started" };
  }

  async function clearTimer(id, exitFunc = null) {
    if (id === null) {
      throw new Error("Provide a timer id.");
    }

    clearInterval(id);
    setStatus("OFF");
    setTimeRemaining({ mins: "00", secs: "00", inNoOfSeconds: 0 });
    if (exitFunc !== null) {
      exitFunc();
    }

    return { message: "Timer Cleared" };
  }

  return { startTimer, clearTimer, timeRemaining, status };
}

export default useTimer;
