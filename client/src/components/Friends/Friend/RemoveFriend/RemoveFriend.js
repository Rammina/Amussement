import CloseIconImg from "../../../../icons/close-icon.png";

import React, { useState } from "react";

import "./RemoveFriend.scss";

const RemoveFriend = (props) => {
  return (
    <>
      <button
        className="friend-item-div-button"
        title={props.text || "Remove Friend"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onClickHandler();
        }}
      >
        <img
          className={`friend-action-button-image danger`}
          src={CloseIconImg}
          alt="X Icon"
        />
      </button>{" "}
    </>
  );
};

export default RemoveFriend;
