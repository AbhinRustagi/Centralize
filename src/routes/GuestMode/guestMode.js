import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { FaPlay, FaPlus, FaStop } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Accordian, Button, showToast, TimerCircle } from "../../components";
import useUserInfo from "../../context/user";
import { useAudio, useTimer } from "../../hooks";

const GuestMode = () => {
  const [sets, setSets] = useState([]);
  const [input, setInput] = useState();
  const [timerId, setTimerId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentSet, setCurrentSet] = useState(null);
  const [playing, toggle] = useAudio();
  const navigate = useNavigate();
  const [{ user }] = useUserInfo();
  const { startTimer, status, clearTimer, timeRemaining } = useTimer();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user?.displayName}`, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (status === "OFF") {
      setTimerId(null);
      removePomodoro(currentSet?.id);
      setCurrentSet(null);
    }
  }, [status]);

  const definedSets = [
    { text: "None Selected", value: "1-1" },
    { text: "15 Mins/5 Mins", value: "15-5" },
    { text: "20 Mins/10 Mins", value: "20-10" },
    { text: "25 Mins/5 Mins", value: "25-5" },
    { text: "35 Mins/5 Mins", value: "35-5" },
    { text: "35 Mins/5 Mins", value: "35-5" },
    { text: "40 Mins/10 Mins", value: "40-10" },
    { text: "45 Mins/15 Mins", value: "45-15" },
    { text: "50 Mins/10 Mins", value: "50-10" },
  ];

  // Event Handlers

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

  // Components

  const renderSetsRow =
    sets.length > 0 ? (
      sets.map(({ id, duration }, _) => (
        <li
          key={id}
          className="px-7 py-4 rounded items-center flex justify-center text-center relative"
          style={{
            background: id && id === currentSet?.id ? "#99BBAD" : "#C8E3D4",
          }}
        >
          {duration} mins
          <div
            className="absolute text-teal-700 cursor-pointer top-1 right-1"
            onClick={() => removePomodoro(id)}
          >
            <IoCloseCircleSharp />
          </div>
        </li>
      ))
    ) : (
      <p className="text-center p-3">You have added no sets yet.</p>
    );

  const renderControls = (
    <Accordian prompt="Controls" defaultState={true}>
      <form className="flex overflow-hidden rounded bg-orange-400 border-gray-300 border border-solid focus:outline-none">
        <select
          className="w-40 bg-zinc-50 px-2 text-neutral-900"
          name="select-set"
          value={input}
          id="select-set"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        >
          {definedSets.map((set) => (
            <option className="p-1 block" value={set.value} key={set.value}>
              {set.text}
            </option>
          ))}
        </select>
        <Button onClick={addSet} role="btn" sm>
          <FaPlus />
          Add
        </Button>
      </form>
      <div className="flex justify-center gap-1 mt-3">
        <Button onClick={startTimerMiddleware} role="btn" type="primaryGreen">
          <FaPlay />
          Start
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            clearTimer(timerId).catch((err) => showToast(err, "danger"));
          }}
          type="primaryRed"
          role="btn"
        >
          <FaStop />
          Clear
        </Button>
      </div>
    </Accordian>
  );

  return (
    <>
      <Helmet>
        <title>Guest Mode – Centralize</title>
      </Helmet>
      <div className="container min-h-80vh py-16 flex flex-wrap flex-row-reverse justify-center gap-16">
        <div className="lg:max-w-half w-full flex flex-col gap-10 justify-center items-center">
          <ul className="w-max max-w-full gap-1 justify-center flex flex-wrap overflow-hidden">
            {renderSetsRow}
          </ul>
          <div>{renderControls}</div>
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
