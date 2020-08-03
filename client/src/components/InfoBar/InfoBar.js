import "./InfoBar.scss";

import NavMenuImg from "../../icons/nav-menu.png";
import UsersImg from "../../icons/users.png";

import React, { useContext } from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import { NavContext } from "../AppContext";

const InfoBar = ({ room }) => {
  const {
    toggleRoomSideBarShow,
    navMenuButtonTouched,
    setNavMenuButtonTouched,
    toggleOnlineUsersShow,
    onlineUsersButtonTouched,
    setOnlineUsersButtonTouched
  } = useContext(NavContext);

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <div
          className="nav-menu-icon-container"
          onClick={() => {
            toggleRoomSideBarShow();
            setNavMenuButtonTouched(true);
          }}
        >
          <img
            className="nav-menu-icon-img"
            src={NavMenuImg}
            alt="Navigation Menu"
          />
        </div>
        <h3 className="room-title">{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <div
          className="users-icon-container"
          onClick={() => {
            toggleOnlineUsersShow();
            setOnlineUsersButtonTouched(true);
          }}
        >
          <img className="users-icon-img" src={UsersImg} alt="Users Icon" />
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
