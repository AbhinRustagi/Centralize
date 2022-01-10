import React, { useState, useEffect, useRef } from "react";
import { useTimer, useAudio } from "../../hooks";
import { TimerCircle } from "../../components";
import useUserInfo from "../../context/user";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { showToast } from "../../components";
import { IoCloseCircleSharp } from "react-icons/io5";

const GuestMode = () => {
  const [playing, toggle] = useAudio();
  const navigate = useNavigate();
  const [{ user }] = useUserInfo();
  const [sets, setSets] = useState([]);
  const [input, setInput] = useState();
  const { startTimer, status, clearTimer, timeRemaining } = useTimer();
  const [timerId, setTimerId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentSet, setCurrentSet] = useState(null);

  useEffect(() => {
    if (status === "OFF") {
      setTimerId(null);
      removePomodoro(currentSet?.id);
      setCurrentSet(null);
    }
  }, [status]);

  if (user) {
    navigate(`/cp/${user.displayName}`, { replace: true });
  }

  const addSet = (e) => {
    e.preventDefault();

    if (!input) {
      showToast("Please select a valid set.", "danger");
      return;
    }

    let length = sets.length;
    const thisSets = input.split("-");
    thisSets.forEach((duration, _) =>
      setSets((sets) => [...sets, { id: length + _ + 1, duration }])
    );
  };

  const removePomodoro = (id) => {
    if (!id || id === null) {
      return;
    }

    if (sets.length === 0) {
      return;
    }

    if (status === "ON" && id === currentSet.id) {
      clearTimer(timerId);
    }

    setSets((sets) => sets.filter((set) => set.id !== id));
  };

  const startTimerMiddleware = () => {
    if (sets.length === 0) {
      showToast("Please add a Pomodoro.", "danger");
      return;
    }

    setCurrentSet(sets[0]);
    const thisTimer = sets[0].duration * 60;
    setDuration(thisTimer);
    startTimer(thisTimer, function () {
      showToast("Pomodoro Complete", "success");
      if (!playing) toggle();
    })
      .then((res) => {
        setTimerId(res.id);
      })
      .catch((err) => showToast(err, "danger"));
  };

  return (
    <>
      <Helmet>
        <title>Guest Mode – Centralize</title>
      </Helmet>
      <div className="container min-h-80vh py-16 flex flex-wrap flex-row-reverse gap-6">
        <div className="lg:max-w-half w-full flex flex-col gap-10 justify-center items-center">
          <div className="w-max mx-auto">
            <form className="flex bg-blue-800 border border-gray-800 focus:outline-none">
              <select
                className="w-36 bg-zinc-50 text-neutral-900"
                name="select-set"
                value={input}
                id="select-set"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              >
                <option className="p-1 block" value="1-1">
                  None Selected
                </option>
                <option className="p-1 block" value="25-5">
                  25 mins/5 mins
                </option>
                <option className="p-1 block" value="35-5">
                  35 mins/5 mins
                </option>
                <option className="p-1 block" value="40-10">
                  40 mins/10 mins
                </option>
                <option className="p-1 block" value="45-15">
                  45 mins/15 mins
                </option>
                <option className="p-1 block" value="50-10">
                  50 mins/10 mins
                </option>
              </select>
              <button
                onClick={addSet}
                className="inline-block p-2 text-white pointer flex-1"
              >
                Add Set
              </button>
            </form>
            <div className="flex justify-center gap-1 mt-3">
              <button
                className="py-3 px-3 text-sm bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 border-solid border border-gray-800 w-full min-w-max"
                onClick={startTimerMiddleware}
              >
                Start Timer
              </button>
              <button
                className="py-3 px-3 text-sm bg-red-500 text-white hover:bg-red-500/30 hover:text-black border-solid border border-gray-800 w-full min-w-max"
                onClick={(e) => {
                  e.preventDefault();
                  clearTimer(timerId).catch((err) => showToast(err, "danger"));
                }}
              >
                Clear Timer
              </button>
            </div>
          </div>
          <div className="w-max max-w-full gap-1 justify-center flex flex-wrap overflow-hidden">
            {sets.length !== 0 ? (
              sets.map((set, _) => (
                <div
                  key={set.id}
                  className="px-5 py-3 text-neutral-900 items-center flex justify-center text-center border bg-blue-100 border-gray-800 relative"
                >
                  {set.duration} mins
                  <div
                    className="absolute text-blue-500 cursor-pointer top-1 right-1"
                    onClick={() => {
                      removePomodoro(set.id);
                    }}
                  >
                    <IoCloseCircleSharp />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center p-3">You have added no sets yet.</p>
            )}
          </div>
        </div>
        <TimerCircle
          className="lg:max-w-half w-full"
          timeLeft={timeRemaining.inNoOfSeconds}
          countdown={{ mins: timeRemaining.mins, secs: timeRemaining.secs }}
          totalTime={duration}
        />
      </div>
    </>
  );
};

export default GuestMode;
