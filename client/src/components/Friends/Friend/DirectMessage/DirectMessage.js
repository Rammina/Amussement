import ChatIconImg from "../../../../icons/chat.png";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HoverMarker from "../../../UIComponents/HoverMarker/HoverMarker";

import "./DirectMessage.scss";

const DirectMessage = (props) => {
  const [isMouseHoveredOnButton, setIsMouseHoveredOnButton] = useState(false);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (props.user)
      setRoomName(`${[props.user._id, props.friend._id].sort().join("_")}DM`);
  }, [props.user]);

  const onMouseEnterButtonHandler = () => {
    setIsMouseHoveredOnButton(true);
  };

  const onMouseLeaveButtonHandler = () => {
    setIsMouseHoveredOnButton(false);
  };

  return (
    <>
      <Link
        to={`/chat?room=${roomName}&userType=user&roomType=DM&receiver=${props.friend.username}`}
        className="friend-item-div-button"
        onClick={(e) => {
          e.stopPropagation();
          props.sendMessageOnClickHandler();
        }}
        onMouseEnter={onMouseEnterButtonHandler}
        onMouseLeave={onMouseLeaveButtonHandler}
      >
        <HoverMarker
          className="friend"
          isShown={isMouseHoveredOnButton}
          textContent="Message"
        />
        <img
          className={`friend-action-button-image`}
          src={ChatIconImg}
          alt="Chat Bubble Icon"
        />
      </Link>
    </>
  );
};

export default DirectMessage;
