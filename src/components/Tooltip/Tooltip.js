/** @jsxImportSource @emotion/react */
/* eslint-disable no-unused-vars */
import { css } from "@emotion/react";
import Proptypes from "prop-types";
import React from "react";

const styles = css`
  &::after {
    content: attr(data-tooltip);
    font-size: 0.75rem;
    color: #121212;
    background-color: #fafafa;

    position: absolute;
    top: calc(100% + 5px);
    right: 10px;

    // background-color: #fafafa;

    padding: 5px 10px;
    height: 0;
    width: 0;

    border-radius: 3px;
    border: 1px solid #121212;
    overflow: hidden;

    opacity: 0;
    transition: 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  &:hover::after {
    height: max-content;
    opacity: 1;
    width: 200px;
  }
`;

const Tooltip = ({ children, text, ...rest }) => {
  return (
    <span
      data-tooltip={text}
      css={styles}
      className="cursor-pointer relative"
      {...rest}
    >
      {children}
    </span>
  );
};

Tooltip.propTypes = {
  children: Proptypes.node,
  text: Proptypes.string.isRequired,
};

export default Tooltip;
