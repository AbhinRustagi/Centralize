/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css, jsx } from "@emotion/react";

const TimerCircle = ({
  timeLeft = "Please set a time",
  totalTime,
  countdown,
}) => {
  // Hooks
  const FULL_DASH_ARRAY = 283;
  const circlePath = useRef(null);
  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeout(() => {
        circlePath.current.setAttribute("stroke-dasharray", 283);
      }, 1500);
      return;
    }

    const timefraction = () => timeLeft / totalTime;

    const circleDasharray = `${(timefraction() * FULL_DASH_ARRAY).toFixed(
      0
    )} 283`;
    circlePath.current.setAttribute("stroke-dasharray", circleDasharray);
  }, [timeLeft]);

  // styles
  const base_timer = css`
    position: relative;
    height: 300px;
    width: 300px;
  `;

  const circle = css`
    fill: none;
    stroke: none;
  `;

  const path_elapsed = css`
    stroke-width: 7px;
    stroke: grey;
  `;

  const label = css`
    position: absolute;
    top: 0;
    z-index: 99;
    padding: 50px;

    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;

    width: 300px;
    height: 300px;

    text-align: right;
    font-weight: 500;
  `;

  const minutes = css`
    font-size: 2.4rem;
    line-height: 2.5rem;
  `;
  const seconds = css`
    font-size: 2rem;
    line-height: 2.2rem;
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

    color: #aefeff;

    /* Allows the ring to change color when the color value updates */
    stroke: currentColor;
  `;

  return (
    <div css={base_timer}>
      <svg
        className="basetimer-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g css={circle}>
          <circle css={path_elapsed} cx="50" cy="50" r="45" />
          <path
            ref={circlePath}
            id="base-timer-path-remaining"
            strokeDasharray="283"
            css={path_remaining}
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
