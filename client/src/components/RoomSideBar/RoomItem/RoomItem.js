import "./RoomItem.scss";

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import queryString from "query-string";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import ContextMenu from "../../UIComponents/ContextMenu/ContextMenu";

// import onlineIcon from "../../icons/onlineIcon.png";

// import { NavContext } from "../../AppContext";

const RoomItem = (props) => {
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

  const onMouseEnterHandler = () => {
    setIsMouseHovered(true);
  };
  const onMouseLeaveHandler = () => {
    setIsMouseHovered(false);
  };

  const onContextMenuHandler = () => {
    /*
    return (
      <ContextMenu
        componentClass="room"
        clientX={clientX}
        clientY={clientY}
        onClose={props.onClose}
      >
        <div className="context-menu-buttons-container message user">
          <button
            className="context-menu-button message user"
            onClick={props.profileOnClick}
          >
            <span>Profile</span>
          </button>
          {actionButtons}
        </div>
      </ContextMenu>
    );
    */
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
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          onContextMenu={onContextMenuHandler}
          to={props.toUrl}
          className="room-item-link"
        >
          {renderItemContent()}
        </Link>
        <div
          className={`room-item-indicator ${
            isMouseHovered ? "show" : "hide"
          } ${getSelectedClass()}`}
        ></div>
        <HoverMarker isShown={isMouseHovered} textContent={props.room.name} />
      </div>
    </React.Fragment>
  );
};

export default RoomItem;
