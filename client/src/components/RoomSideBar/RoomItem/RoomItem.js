import "./RoomItem.scss";

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import queryString from "query-string";

// import onlineIcon from "../../icons/onlineIcon.png";

// import { NavContext } from "../../AppContext";

const RoomItem = props => {
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const location = useLocation();
  console.log(location);
  // console.log(props.location);

  useEffect(() => {
    checkSelectedRoom();

    return () => {
      // setIsSelectedRoom(false);
    };
  }, [location.search]);

  console.log(props.user);
  const getUserType = () => (props.user ? "user" : "guest");

  const checkSelectedRoom = () => {
    if (!props.room || !props.room.name) {
      setIsSelectedRoom(false);
    }

    let search = location.search;
    let params = new URLSearchParams(search);
    let currentRoom = params.get("room");

    if (!currentRoom) {
      setIsSelectedRoom(false);
    }
    if (currentRoom === props.room.name) {
      setIsSelectedRoom(true);
    } else {
      setIsSelectedRoom(false);
    }
  };

  const getSelectedClass = () => (isSelectedRoom ? "selected" : true);

  const handleOnMouseEnter = () => {
    setIsMouseHovered(true);
  };
  const handleOnMouseLeave = () => {
    setIsMouseHovered(false);
  };
  // const getGuestName=() => {}
  const renderItemContent = () => {
    // if there is an image, use the URL in the image tag
    // otherwise, use the first character of the room name
    if (props.room) {
      if (props.room.image_url) {
        // render an image
        return <img className="room-item-content" src={props.room.image_url} />;
      } else {
        return (
          <span className="room-item-content no-image">
            {props.room.name.charAt(0)}
          </span>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className="room-item-container">
        <Link
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          to={`/chat?room=${props.room.name}&userType=${getUserType()}`}
          className="room-item-link"
        >
          {renderItemContent()}
        </Link>
        <div
          className={`room-item-indicator ${
            isMouseHovered ? "show" : "hide"
          } ${getSelectedClass()}`}
        ></div>
        <div
          className={`room-item-label-container ${
            isMouseHovered ? "show" : "hide"
          }`}
        >
          {props.room.name}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoomItem;
