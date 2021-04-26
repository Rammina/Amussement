import CloseIconImg from "../../../../icons/close-icon.png";

import "./RemoveFriend.scss";

import React, { useState } from "react";

import HoverMarker from "../../../UIComponents/HoverMarker/HoverMarker";

const RemoveFriend = (props) => {
  const [isMouseHoveredOnButton, setIsMouseHoveredOnButton] = useState(false);

  const onMouseEnterButtonHandler = () => {
    setIsMouseHoveredOnButton(true);
  };

  const onMouseLeaveButtonHandler = () => {
    setIsMouseHoveredOnButton(false);
  };

  return (
    <>
      <button
        className="friend-item-div-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onClickHandler();
        }}
        onMouseEnter={onMouseEnterButtonHandler}
        onMouseLeave={onMouseLeaveButtonHandler}
      >
        <HoverMarker
          className="remove friend"
          isShown={isMouseHoveredOnButton}
          textContent={props.text || "Cancel"}
        />
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
