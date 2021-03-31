import ChatIconImg from "../../../../icons/chat.png";

import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

// import { directMessage } from "../../../../flux/actions/friendsActions";

import "./DirectMessage.scss";

const DirectMessage = (props) => {
  /*
  const sendMessageOnClickHandler = () => {
    let alreadyAddedToActive = false;
    let roomName = `${[props.user._id, selectedUser._id].sort().join("_")}DM`;
    for (let dmRoom of props.dmRooms) {
      if (dmRoom.name === roomName) {
        // this room has already been created, and also has been added to user active rooms
        alreadyAddedToActive = true;
      }
    }
    if (!alreadyAddedToActive) {
      props.addActiveDmRoom({
        // senderId: props.user._id,
        receiver: selectedUser,
        receiverId: selectedUser._id,
        name: roomName,
        type: "DM",
        requires_approval: "false",
      });
    }
  };
  */
  return (
    <button
      className="friend-item-div-button"
      title={props.text || "Direct Message"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // remove this friend
        // props.directMessage(props.friend._id);
      }}
    >
      <img
        className={`friend-action-button-image`}
        src={ChatIconImg}
        alt="Chat Bubble Icon"
      />
    </button>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {
  // directMessage,
})(DirectMessage);
