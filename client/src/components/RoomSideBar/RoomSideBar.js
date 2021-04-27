import "./RoomSideBar.scss";

import React from "react";
import { connect } from "react-redux";

import RoomItem from "./RoomItem/RoomItem";
import HomeButton from "./HomeButton/HomeButton";
import AddRoomButton from "./AddRoomButton/AddRoomButton";

const RoomSideBar = (props) => {
  const renderRoomItems = () => {
    return props.rooms.map((room, i) => (
      <RoomItem
        toUrl={`/chat?room=${room._id}&userType=user&roomType=${room.type}`}
        room={room}
        user={props.user}
        key={room._id || i}
        numberOfRooms={props.rooms.length}
      />
    ));
  };
  console.log(props.user);
  return (
    <React.Fragment>
      <div className="room-sidebar-outer-container">
        <HomeButton user={props.user} />

        {renderRoomItems()}
        <RoomItem
          toUrl={`/chat?room=${"6087c5e0b50fd703304ce28b"}&userType=user&roomType=${"public"}`}
          room={{
            _id: "6087c5e0b50fd703304ce28b",

            owner: null,

            name: "Testing Room",
            password: null,
            type: "public",
            messages: [],

            image_url: "",
          }}
          user={props.user}
          key="6087c5e0b50fd703304ce28b"
          numberOfRooms={props.rooms.length}
        />
        <AddRoomButton user={props.user} numberOfRooms={props.rooms.length} />
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
