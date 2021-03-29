import onlineIcon from "../../icons/onlineIcon.png";

import "./RoomSideBar.scss";

import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import RoomItem from "./RoomItem/RoomItem";
import HomeButton from "./HomeButton/HomeButton";
import AddRoomButton from "./AddRoomButton/AddRoomButton";

import { NavContext } from "../AppContext";

const RoomSideBar = (props) => {
  const renderRoomItems = () => {
    return props.rooms.map((room, i) => (
      <RoomItem
        toUrl={`/chat?room=${room.name}&userType=user&roomType=${room.type}`}
        room={room}
        user={props.user}
        key={room._id || i}
      />
    ));
  };
  console.log(props.user);
  return (
    <React.Fragment>
      <div className="room-sidebar-outer-container">
        <HomeButton user={props.user} />

        {renderRoomItems()}
        <AddRoomButton user={props.user} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  rooms: state.rooms,
});

const roomSideBar = connect(mapStateToProps, {
  /*getRooms*/
})(RoomSideBar);

export default roomSideBar;

/* Dummy servers
 <RoomItem
          toUrl={`/chat?room=${"madMax"}&userType=user`}
          room={{ name: "madMax" }}
          user={props.user}
        />
        <RoomItem
          toUrl={`/chat?room=${"IloveEmilia"}&userType=user`}
          room={{
            name: "IloveEmilia",
            image_url: `https://res.cloudinary.com/rammina/image/upload/v1598598880/amussement-avatars/5f423937dd4b511da81e2af1-user-avatar.png`,
          }}
          user={props.user}
        />
*/
