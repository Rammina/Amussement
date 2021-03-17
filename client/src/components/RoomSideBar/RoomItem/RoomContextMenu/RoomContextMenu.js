import React from "react";
import { connect } from "react-redux";

import ContextMenu from "../../../UIComponents/ContextMenu/ContextMenu";

// import { getFriendStatusWithUser } from "../../../../helpers";
// import {leaveRoom} from "../../../../flux/actions/roomsActions";

const RoomContextMenu = (props) => {
  // note: functions that check if current user is owner or a member of the room

  const leaveRoomOnClickHandler = () => {
    // using a callback will be nice as well
    props.onClose();
    props.leaveRoom(props.userId);
  };

  let actionButtons = null;
  // just need to check if owner or member of a room
  // note: (check for other roles as well in the future)

  // owner of the room
  if (room.owner === props.user._id) {
    actionButtons = (
      <button
        className="context-menu-button room"
        onClick={deleteRoomOnClickHandler}
      >
        <span>Add Friend</span>
      </button>
    );
  } else if (room.owner !== props.user._id) {
  }

  return (
    <ContextMenu
      componentClass="message user"
      clientX={props.clientX}
      clientY={props.clientY}
      onClose={props.onClose}
    >
      <div className="context-menu-buttons-container message user">
        <button
          className="context-menu-button message user"
          onClick={props.profileOnClick}
        >
          <span>Profile</span>
        </button>
        {actionButtons}
      </div>
    </ContextMenu>
  );
};

export default connect(null, { addFriendWithId, leaveRoom })(RoomContextMenu);
