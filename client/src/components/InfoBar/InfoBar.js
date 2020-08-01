import NavMenuImg from "../../icons/nav-menu.png";
import UsersImg from "../../icons/users.png";

import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.scss";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <div className="nav-menu-icon-container">
        <img
          className="nav-menu-icon-img"
          src={NavMenuImg}
          alt="Navigation Menu"
        />
      </div>
      <h3 className="room-title">{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <div className="users-icon-container">
        <img className="users-icon-img" src={UsersImg} alt="Users Icon" />
      </div>
    </div>
  </div>
);

export default InfoBar;
