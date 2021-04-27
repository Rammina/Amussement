import React from "react";

import ContextMenu from "../../../UIComponents/ContextMenu/ContextMenu";

const RoomContextMenu = (props) => {
  // note: functions that check if current user is owner or a member of the room

  let actionButtons = null;
  // just need to check if owner or member of a room
  // note: (check for other roles as well in the future)

  // owner of the room
  if (props.isOwnedByCurrentUser) {
    actionButtons = (
      <>
        <button
          className="context-menu-button room"
          onClick={props.roomSettingsOnClick}
        >
          <span>Room Settings</span>
        </button>
        <button
          className="context-menu-button room danger"
          onClick={props.deleteRoomOnClick}
        >
          <span>Delete Room</span>
        </button>
      </>
    );
  } else if (!props.isOwnedByCurrentUser) {
    actionButtons = (
      <button
        className="context-menu-button room danger"
        onClick={props.leaveRoomOnClick}
      >
        <span>Leave Room</span>
      </button>
    );
  }

  return (
    <ContextMenu
      componentClass="message user"
      clientX={props.clientX}
      clientY={props.clientY}
      onClose={props.onClose}
    >
      <div className="context-menu-buttons-container message user">
        {actionButtons}
      </div>
    </ContextMenu>
  );
};

export default RoomContextMenu;
