import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Accordian = ({
  children,
  prompt,
  defaultState = false,
  arrow = true,
}) => {
  const [state, setState] = useState(defaultState);
  return (
    <>
      <span
        className="w-full gap-3 font-medium flex items-center justify-center cursor-pointer"
        onClick={() => setState(!state)}
      >
        {prompt}
        {arrow && <FaAngleDown className={state ? "rotate-180" : ""} />}
      </span>
      <div
        className={`w-max overflow-hidden mx-auto ${
          state ? "max-h-screen mt-3" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Accordian;
