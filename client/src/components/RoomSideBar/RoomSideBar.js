import "./RoomSideBar.scss";

import React, { useContext, useEffect } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import { NavContext } from "../AppContext";

const RoomSideBarContainer = ({ users }) => {
  const {
    navMenuButtonTouched,
    roomSideBarShow,
    setRoomSideBarShow
  } = useContext(NavContext);

  const handleResize = () => {
    if (!navMenuButtonTouched) {
      if (window.innerWidth >= 1000) {
        setRoomSideBarShow(true);
      } else {
        setRoomSideBarShow(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const getContainerClass = () => {
    return roomSideBarShow ? "show" : "hide";
  };

  return (
    <div className={`room-sidebar-container ${getContainerClass()}`}>
      <h1 className="room-sidebar-status">Rooms</h1>
      <div className="activeContainer"></div>
    </div>
  );
};

export default RoomSideBarContainer;
