import "./InfoBar.scss";

import NavMenuImg from "../../icons/nav-menu.png";
import UsersImg from "../../icons/users.png";

import React, { useContext } from "react";
import { connect } from "react-redux";

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
    setOnlineUsersButtonTouched,
    onlineUsersShow,
    roomSideBarShow
  } = useContext(NavContext);

  const getRoomsButtonClass = () => {
    return roomSideBarShow ? "active" : "inactive";
  };

  const getUsersButtonClass = () => {
    return onlineUsersShow ? "active" : "inactive";
  };

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
            className={`nav-menu-icon-img ${getRoomsButtonClass()}`}
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
          <img
            className={`users-icon-img ${getUsersButtonClass()}`}
            src={UsersImg}
            alt="Users Icon"
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
  // propsInitialized: true
});

export default connect(
  mapStateToProps,
  {}
)(InfoBar);
