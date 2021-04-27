import React, { useState } from "react";
import { connect } from "react-redux";

import ContextMenu from "../UIComponents/ContextMenu/ContextMenu";

import RemoveFriendModal from "../forms/friend/RemoveFriendModal";
import { getFriendStatusWithUser } from "../../helpers";
import {
  addFriendWithId,
  removeFriend,
} from "../../flux/actions/friendsActions";

const UserContextMenu = (props) => {
  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);

  const addFriendOnClickHandler = () => {
    props.onClose();
    props.addFriendWithId(props.selectedUser._id);
  };

  const removeFriendOnClickHandler = () => {
    setShowRemoveFriendModal(true);
  };

  const closeRemoveFriendModalHandler = () => {
    setShowRemoveFriendModal(false);
    props.onClose();
  };

  const renderRemoveFriendModal = () => {
    if (!showRemoveFriendModal) return null;
    return (
      <RemoveFriendModal
        selectedUser={props.selectedUser}
        connectionToUser={getFriendStatusWithUser(
          props.selectedUser._id,
          props.friends
        )}
        onModalClose={closeRemoveFriendModalHandler}
      />
    );
  };

  let actionButtons = null;
  // sent by a friend
  if (
    props.friendStatus === "accepted" ||
    (props.friends &&
      !props.isCurrentUser &&
      getFriendStatusWithUser(props.selectedUser._id, props.friends) ===
        "accepted")
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
    props.friendStatus === "requested" ||
    (props.friends &&
      !props.isCurrentUser &&
      getFriendStatusWithUser(props.selectedUser._id, props.friends) ===
        "requested")
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
    props.friendStatus === "pending" ||
    (props.friends &&
      !props.isCurrentUser &&
      getFriendStatusWithUser(props.selectedUser._id, props.friends) ===
        "pending")
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

  return showRemoveFriendModal ? (
    // show the modal
    renderRemoveFriendModal()
  ) : (
    // otherwise, show the context menu
    <>
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
    </>
  );
};

export default connect(null, { addFriendWithId, removeFriend })(
  UserContextMenu
);
