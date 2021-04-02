import React from "react";
import { connect } from "react-redux";

import ContextMenu from "../../../UIComponents/ContextMenu/ContextMenu";

import { getFriendStatusWithUser } from "../../../../helpers";
import {
  addFriendWithId,
  removeFriend,
} from "../../../../flux/actions/friendsActions";

const UserContextMenu = (props) => {
  const addFriendOnClickHandler = () => {
    props.onClose();
    props.addFriendWithId(props.userId);
  };

  const removeFriendOnClickHandler = () => {
    // using a callback will be nice as well
    props.onClose();
    props.removeFriend(props.userId);
  };

  let actionButtons = null;
  // sent by a friend
  if (
    !props.isCurrentUser &&
    getFriendStatusWithUser(props.userId, props.friends) === "accepted"
  ) {
    actionButtons = (
      <>
        <button
          className="context-menu-button message"
          onClick={props.sendMessageOnClick}
        >
          <span>Send Message</span>
        </button>
        <button
          className="context-menu-button message danger"
          onClick={removeFriendOnClickHandler}
        >
          <span>Remove Friend</span>
        </button>
      </>
    );
  } else if (
    !props.isCurrentUser &&
    getFriendStatusWithUser(props.userId, props.friends) === "requested"
  ) {
    actionButtons = (
      <>
        <button
          className="context-menu-button message danger"
          onClick={removeFriendOnClickHandler}
        >
          <span>Cancel Friend Request</span>
        </button>
      </>
    );
  } else if (
    !props.isCurrentUser &&
    getFriendStatusWithUser(props.userId, props.friends) === "pending"
  ) {
    actionButtons = (
      <>
        <button
          className="context-menu-button message user"
          onClick={addFriendOnClickHandler}
        >
          <span>Accept Friend Request</span>
        </button>
      </>
    );
  }
  // sent by a non-friend
  else if (!props.isCurrentUser) {
    actionButtons = (
      <button
        className="context-menu-button message user"
        onClick={addFriendOnClickHandler}
      >
        <span>Add Friend</span>
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

export default connect(null, { addFriendWithId, removeFriend })(
  UserContextMenu
);
