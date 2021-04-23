import HomeImg from "../../../icons/home.png";

import "./HomeButton.scss";

import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import queryString from "query-string";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import { findPosX, findPosY } from "../../../helpers";

const HomeButton = (props) => {
  const roomItemRef = useRef(null);
  const [roomMarkerX, setRoomMarkerX] = useState(-200);
  const [roomMarkerY, setRoomMarkerY] = useState(-200);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();
  console.log(location);
  // console.log(location);

  useEffect(() => {
    checkSelected();

    return () => {
      // setIsSelected(false);
    };
  }, [location.search]);

  useEffect(() => {
    if (roomItemRef.current !== null) {
      setRoomMarkerX(findPosX(roomItemRef.current));
      setRoomMarkerY(findPosY(roomItemRef.current));
    }
    /*return () => {}*/
  }, [roomItemRef.current]);

  console.log(props.user);

  const checkSelected = () => {
    if (
      location.pathname.includes("/users") &&
      location.pathname.includes("/home")
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  const getSelectedClass = () => (isSelected ? "selected" : true);

  const handleOnMouseEnter = () => {
    setIsMouseHovered(true);
  };
  const handleOnMouseLeave = () => {
    setIsMouseHovered(false);
  };

  return (
    props.user && (
      <React.Fragment>
        <div className="room-item-container" ref={roomItemRef}>
          <Link
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            to={`/users/${props.user._id || props.user.id}/home`}
            className="room-item-link"
          >
            <div
              id="home-button-img-container"
              className={`room-item-content ${getSelectedClass()}`}
            >
              <img id="home-button-img" src={HomeImg} alt="home icon" />
            </div>
          </Link>
          <div
            className={`room-item-indicator ${
              isMouseHovered ? "show" : "hide"
            } ${getSelectedClass()}`}
          ></div>
          <HoverMarker
            isShown={isMouseHovered}
            textContent="Home"
            customStyle={{
              left: `calc(${roomMarkerX}px + 4rem)`,
              top: `calc(${roomMarkerY}px + 0.5rem)`,
            }}
          />
        </div>
      </React.Fragment>
    )
  );
};

export default HomeButton;
