import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./RoomSideBar.css";

const RoomSideBarContainer = ({ users }) => (
  <div className="room-sidebar-container">
    <h1 className="room-sidebar-status">Rooms</h1>
    <div className="activeContainer"></div>
  </div>
);

export default RoomSideBarContainer;
