import onlineIcon from "../../icons/onlineIcon.png";

import "./RoomSideBar.scss";

import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import RoomItem from "./RoomItem/RoomItem";

import { NavContext } from "../AppContext";

const RoomSideBar = props => {
  return (
    <React.Fragment>
      <div className="room-sidebar-outer-container">
        <RoomItem room={{ name: "mad Max" }} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
});

const roomSideBar = connect(
  mapStateToProps,
  {
    /*getRooms*/
  }
)(RoomSideBar);

export default roomSideBar;
