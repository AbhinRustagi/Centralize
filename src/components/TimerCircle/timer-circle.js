/** @jsxImportSource @emotion/react */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { css, jsx } from "@emotion/react";

const TimerCircle = ({
  timeLeft = "Please set a time",
  totalTime,
  countdown,
  className,
}) => {
  // Hooks
  const FULL_DASH_ARRAY = 283;
  const circlePath = useRef(null);
  const [color, setColor] = useState("text-blue-500");

  useEffect(() => {
    if (timeLeft <= 0 || (countdown.mins === "00" && countdown.secs === "00")) {
      setTimeout(() => {
        circlePath.current.setAttribute("stroke-dasharray", 283);
      }, 1500);
      setColor("text-blue-500");
      return;
    }

    const timefraction = () => timeLeft / totalTime;

    const circleDasharray = `${(timefraction() * FULL_DASH_ARRAY).toFixed(
      0
    )} 283`;
    circlePath.current.setAttribute("stroke-dasharray", circleDasharray);

    if (timeLeft <= 0.1 * totalTime) {
      setColor("text-red-500");
    } else if (timeLeft > 0.1 * totalTime && timeLeft <= 0.3 * totalTime) {
      setColor("text-green-500");
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [timeLeft, countdown]);

  // styles
  const base_timer = css`
    position: relative;
    margin: auto;
    max-height: 600px;
    max-width: 600px;
    height: 100%;
    width: 100%;
  `;

  const circle = css`
    fill: none;
    stroke: none;
  `;

  const path_elapsed = css`
    stroke-width: 7px;
  `;

  const label = css`
    position: absolute;
    top: 0;
    z-index: 99;
    padding: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    max-height: 600px;
    max-width: 600px;
    height: 100%;
    width: 100%;

    text-align: right;
    font-weight: 600;
  `;

  const minutes = css`
    font-size: 2.1rem;
  `;
  const seconds = css`
    font-size: 1.6rem;
  `;

  const path_remaining = css`
    /* Just as thick as the original ring */
    stroke-width: 7px;

    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;

    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;

    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;

    /* Allows the ring to change color when the color value updates */
    stroke: currentColor;
  `;

  return (
    <div css={base_timer} className={className}>
      <svg
        className="basetimer-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g css={circle}>
          <circle
            css={path_elapsed}
            className="stroke-blue-200"
            cx="50"
            cy="50"
            r="45"
          />
          <path
            ref={circlePath}
            id="base-timer-path-remaining"
            strokeDasharray="283"
            css={path_remaining}
            className={color}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <div css={label}>
        <span css={minutes}>{countdown.mins + " Minutes"}</span>
        <span css={seconds}>{countdown.secs + " Seconds"}</span>
      </div>
    </div>
  );
};

export default TimerCircle;
