import { useEffect, useState } from "react";

export default function useTimer() {
  const [status, setStatus] = useState("INACTIVE");
  const [timeRemaining, setTimeRemaining] = useState({
    total: 0,
    mins: "00",
    secs: "00",
  });

  const convertToString = (value) => {
    return value < 10 ? "0" + String(value) : String(value);
  };

  const startTimer = (duration, exitFunc = null) => {
    if (status === "ON") {
      alert("Another timer already running.");
      return;
    }

    if (duration <= 0) {
      alert("Invalid Duration");
      return;
    }

    // duration in seconds
    let timer = duration;

    const id = setInterval(() => {
      setTimeRemaining({
        total: timer,
        mins: convertToString(parseInt(timer / 60, 10)),
        secs: convertToString(parseInt(timer % 60, 10)),
      });

      if (--timer < 0) {
        clearTimer(id, exitFunc);
      }
    }, 1000);

    setStatus("ON");
    return { id };
  };

  const clearTimer = (id, exitFunc = null) => {
    if (id === null) {
      alert("Invalid id");
      return;
    }

    clearInterval(id);
    setStatus("OFF");
    setTimeRemaining({ total: 0, mins: "00", secs: "00" });

    if (exitFunc !== null) {
      exitFunc();
    }
    return;
  };

  return { startTimer, clearTimer, timeRemaining, status, setStatus };
}
