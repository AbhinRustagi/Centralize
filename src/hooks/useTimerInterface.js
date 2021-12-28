import { useState } from "react";

const useTimerInterface = ({ duration, exitFunc = false }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerId, setTimerId] = useState();
  const [countdown, setCountdown] = useState({ mins: "00", secs: "00" });

  const [details, setDetails] = useState({ startTime: null, endTime: null });

  const stopTimer = () => {
    clearInterval(timerId);
    setCountdown({ mins: "00", secs: "00" });
    setDetails({ ...details, endTime: Date.now() });

    return;
  };

  const startTimer = () => {
    setDetails({ ...details, startTime: Date.now() });

    // duration in seconds
    var timer = duration,
      minutes,
      seconds;

    let timerInterval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setCountdown({ ...countdown, mins: minutes, secs: seconds });
      setTimeLeft(timer);

      if (--timer < 0) {
        stopTimer();
        setTimeLeft(0);

        if (exitFunc) {
          exitFunc();
        }
      }
    }, 1000);

    setTimerId(timerInterval);

    return;
  };

  return { startTimer, stopTimer, details, timeLeft, countdown };
};

export default useTimerInterface;
