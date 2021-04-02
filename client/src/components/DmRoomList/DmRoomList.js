import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { getAllDmRooms } from "../../flux/actions/dmRoomsActions";

import UserItem from "../UIComponents/UserItem/UserItem";

const DmRoomList = (props) => {
  const location = useLocation();

  // retrieve DM rooms every time the user or the URL changes
  const getDmRoomsHandler = () => {
    // only get the rooms if user is logged in in the first place
    // note: has consistency bugs and it should check if it's already loaded once so it doesn't repeat anymore
    if (props.user && props.user._id && !props.dmRooms)
      props.getAllDmRooms(props.user._id);
  };
  useEffect(() => {
    getDmRoomsHandler();
    /*return () => {}*/
  }, [props.user, location.search]);

  // render functions
  if (!props.user || !props.dmRooms) return null;
  const rooms = props.dmRooms;

  const getReceiverInDmRoom = (room) => {
    for (let member of room.members) {
      if (member.user._id !== props.user._id) {
        return (
          <UserItem
            isLink={true}
            user={member.user}
            room={room}
            key={room._id || room.name}
          />
        );
      }
    }
  };
  return rooms.map((room) => {
    console.log(room.name);
    console.log(room);
    console.log(room.members);
    // get the user that is not the current logged in one

    console.log(room);
    return getReceiverInDmRoom(room);
  });
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  getAllDmRooms,
})(DmRoomList);
