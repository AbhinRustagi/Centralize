import React, { useEffect, useState, useRef, useCallback } from "react";
import Helmet from "react-helmet";
import { FaPlay, FaPlus, FaStop } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Accordian, Button, showToast, TimerCircle } from "../../components";
import useUserInfo from "../../context/user";
import { useAudio, useTimer } from "../../hooks";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const GuestMode = () => {
  const [sets, setSets] = useState([]);
  const [input, setInput] = useState();
  const [automaticPlay, setAutomaticPlay] = useState(true);
  const [timerId, setId] = useState(null);
  const [currentSet, setCurrentSet] = useState(null);
  const [playing, toggle] = useAudio();
  const navigate = useNavigate();
  const [{ user }] = useUserInfo();
  const { startTimer, status, clearTimer, timeRemaining, setStatus } =
    useTimer();

  const toggleAudio = () => {
    if (!playing) toggle();
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user?.displayName}`, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (sets.length > 1 && status === "OFF") {
      if (automaticPlay) {
        let temp = sets[1];
        removePomodoro(sets[0].id);
        let { id } = startTimer(temp.duration * 60, toggleAudio);
        setCurrentSet(temp);
        setId(id);
      } else {
        removePomodoro(sets[0].id);
        setId(null);
        setCurrentSet(null);
      }
    } else if (sets.length === 1 && status === "OFF") {
      setSets([]);
      setId(null);
      setCurrentSet(null);
    }
  }, [status]);

  const definedSets = [
    { text: "None Selected", value: "1-1", selected: true },
    { text: "15 Mins/5 Mins", value: "15-5" },
    { text: "20 Mins/10 Mins", value: "20-10" },
    { text: "25 Mins/5 Mins", value: "25-5" },
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

    const thisSets = input.split("-");
    thisSets.forEach((duration, _) =>
      setSets((sets) => [
        ...sets,
        { id: Math.round(Math.random() * 500), duration },
      ])
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
      clearInterval(timerId);
      clearTimer(timerId);
      setStatus("OFF");
      setId(null);
      return;
    }

    setSets((sets) => sets.filter((set) => set.id !== id));
  };

  const startTimerMiddleware = () => {
    if (sets.length === 0) {
      showToast("Please add a Pomodoro.", "danger");
      return;
    }
    if (timerId !== null) {
      showToast("Another timer running", "danger");
      return;
    }

    let { id } = startTimer(sets[0].duration * 60, toggleAudio);
    setId(id);
    setCurrentSet(sets[0]);
  };

  // Components

  const Set = ({ id, text, index, moveSet }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
      accept: "set",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        if (currentSet.id === id) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveSet(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "set",
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag() {
        if (id === currentSet.id) return false;
        return true;
      },
    });
    drag(drop(ref));

    return (
      <li
        ref={ref}
        className={`px-7 py-4 font-medium rounded-md items-center flex justify-center text-center relative shadow-md cursor-pointer ${
          isDragging ? "opacity-20" : "opacity-100"
        } ${id && id === currentSet?.id ? "bg-neutral-100" : "bg-white"}`}
        data-handler-id={handlerId}
      >
        {text} minutes
        <div
          className="absolute text-black cursor-pointer top-1 right-1"
          onClick={() => removePomodoro(id)}
        >
          <IoCloseCircleSharp />
        </div>
      </li>
    );
  };

  const renderControls = (
    <div className="bg-white p-4 rounded-md shadow">
      <Accordian prompt="Timer Controls" defaultState={true}>
        <form className="flex overflow-hidden text-white gap-1 bg-transparent focus:outline-none">
          <select
            className="flex-1 bg-gray-100 p-3 text-neutral-900 rounded-md"
            name="select-set"
            value={input}
            id="select-set"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          >
            {definedSets.map((set) => (
              <option
                className="p-1 block"
                value={set.value}
                key={set.value}
                selected={set?.selected}
              >
                {set.text}
              </option>
            ))}
          </select>
          <Button onClick={addSet} role="btn" type="primary">
            <FaPlus />
          </Button>
        </form>
        <div className="flex justify-center gap-1 mt-3">
          <Button onClick={startTimerMiddleware} role="btn" type="green">
            <FaPlay />
            Start
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              clearTimer(timerId);
            }}
            type="red"
            role="btn"
          >
            <FaStop />
            Clear
          </Button>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <input
            onChange={() => setAutomaticPlay(!automaticPlay)}
            type="checkbox"
            checked={automaticPlay}
            name="automaticPlay"
            id="automaticPlay"
            className="mr-2 w-5 h-5 cursor-pointer"
          />
          <label htmlFor="automaticPlay" className="text-sm font-medium">
            Start Next Timer Automatically
          </label>
        </div>
      </Accordian>
    </div>
  );
  const moveSets = useCallback(
    (dragIndex, hoverIndex) => {
      const dragSet = sets[dragIndex];
      setSets(
        update(sets, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragSet],
          ],
        })
      );
    },
    [sets]
  );
  const renderSet = (set, index) => {
    return (
      <Set
        key={set.id}
        index={index}
        id={set.id}
        text={set.duration}
        moveSet={moveSets}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Guest Mode – Centralize</title>
      </Helmet>
      <div className="container min-h-80vh py-16 flex flex-wrap items-center justify-center gap-10">
        <TimerCircle
          className="lg:max-w-lg m-0 w-full"
          timeLeft={timeRemaining.total}
          countdown={{ mins: timeRemaining.mins, secs: timeRemaining.secs }}
          totalTime={currentSet?.duration * 60}
        />
        <div className="lg:max-w-sm w-full flex flex-col gap-10 justify-center items-center">
          <DndProvider backend={HTML5Backend}>
            <ul className="w-max max-w-full gap-1 justify-center flex flex-wrap">
              {sets.length > 0 ? (
                sets.map((set, i) => renderSet(set, i))
              ) : (
                <p>You have added no sets yet.</p>
              )}
            </ul>
          </DndProvider>

          <div>{renderControls}</div>
        </div>
      </div>
    </>
  );
};

export default GuestMode;
