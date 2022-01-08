import React, { useState } from "react";
import useTimer from "usetimer-react";
import { TimerCircle } from "../../components";
import useUserInfo from "../../context/user";
import { Navigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const GuestMode = () => {
  const [{ user }] = useUserInfo();
  const [sets, setSets] = useState([]);
  useEffect(() => {
    console.log(sets);
  }, [sets]);

  const {
    startTimer,
    stopTimer,
    setTimerDuration,
    countdown,
    duration,
    timeLeft,
  } = useTimer();

  if (user) {
    return <Navigate to={`/cp/${user.username}`} />;
  }

  const addSet = (set) => {
    const thisSets = set.split("-");
    thisSets.forEach((time, _) =>
      setSets((sets) => [...sets, { id: _, time }])
    );
  };

  return (
    <div className="container my-16">
      <div id="sets" className="border border-gray-800 w-max mx-auto my-10">
        {sets.length === 0 ? (
          <div className="p-3">
            <span>
              You have added no
              <br /> pomodoro sets yet.
            </span>
          </div>
        ) : (
          sets.map((set) => <div>{set.time}</div>)
        )}
        <div className="flex bg-teal-800 border-t border-t-gray-800 w-max mt-3">
          <select className="w-36" name="" id="">
            <option value="">25-5</option>
            <option value="">35-5</option>
            <option value="">45-15</option>
            <option value="">50-10</option>
          </select>
          <span
            onClick={() => addSet("25-5")}
            className="inline-block p-2 text-white pointer"
          >
            Add Set
          </span>
        </div>
      </div>
      <TimerCircle
        timeLeft={timeLeft}
        countdown={countdown}
        totalTime={duration}
      />
      <div className="flex justify-center gap-10 my-10">
        <button onClick={() => setTimerDuration(60)}>Set Duration</button>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Clear Timer</button>
      </div>
    </div>
  );
};

export default GuestMode;
