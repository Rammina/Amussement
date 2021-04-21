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
            isDmLink={true}
            user={member.user}
            room={room}
            key={room._id || room.name}
          />
        );
      }
    }
  };

  const renderComponent = () =>
    props.user && props.dmRooms.length > 0
      ? rooms.map((room) => {
          return getReceiverInDmRoom(room);
        })
      : // do not render anything if user and DM room list is not loaded yet
        null;

  return renderComponent();
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  getAllDmRooms,
})(DmRoomList);
