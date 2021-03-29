import React from "react";

import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// import { removeActiveDmRoom } from "../../flux/actions/dmRoomsActions";

import ProfilePicture from "../ProfilePicture/ProfilePicture";

const DmRoomList = (props) => {
  if (!props.user || !props.dmRooms) return null;
  const rooms = props.dmRooms;

  const getReceiverInDmRoom = (room) => {
    for (let member of room.members) {
      if (member.user._id !== props.user._id) {
        return (
          <>
            <Link
              to={`/chat?room=DMto${member.user._id}&userType=user&roomType=DM&receiver=${member.user.username}`}
              className="left-sidebar-item-outer-container"
            >
              <ProfilePicture
                imageSrc={member.user.image_url || ""}
                componentClass={`sidebar`}
                // onClick={userOnClickHandler}
                // onContextMenu={userOnContextMenuHandler}
              />
              <span className="left-sidebar-item-text">
                {member.user.username}
              </span>
            </Link>
          </>
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
  //removeActiveDmRoom
})(DmRoomList);
