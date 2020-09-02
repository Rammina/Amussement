import onlineIcon from "../../icons/onlineIcon.png";

import "./RoomSideBar.scss";

import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import RoomItem from "./RoomItem/RoomItem";

import { NavContext } from "../AppContext";

const RoomSideBar = props => {
  console.log(props.user);
  return (
    <React.Fragment>
      <div className="room-sidebar-outer-container">
        <RoomItem room={{ name: "madMax" }} user={props.user} />
        <RoomItem
          room={{
            name: "IloveEmilia",
            image_url: `https://res.cloudinary.com/rammina/image/upload/v1598598880/amussement-avatars/5f423937dd4b511da81e2af1-user-avatar.png`
          }}
          user={props.user}
        />
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
