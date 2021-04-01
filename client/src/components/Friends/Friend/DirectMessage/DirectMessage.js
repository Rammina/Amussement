import ChatIconImg from "../../../../icons/chat.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

// import { directMessage } from "../../../../flux/actions/friendsActions";
import { addActiveDmRoom } from "../../../../flux/actions/dmRoomsActions";

import "./DirectMessage.scss";

const DirectMessage = (props) => {
  const sendMessageOnClickHandler = () => {
    let alreadyAddedToActive = false;
    let roomName = `${[props.user._id, props.friend._id].sort().join("_")}DM`;

    for (let dmRoom of props.dmRooms) {
      if (dmRoom.name === roomName) {
        alreadyAddedToActive = true;
      }
    }

    if (!alreadyAddedToActive) {
      props.addActiveDmRoom({
        // senderId: props.user._id,
        owner: null,
        receiver: props.friend,
        receiverId: props.friend._id,
        messages: [],
        members: [
          { user: props.user, roles: ["member"] },
          { user: props.friend, roles: ["member"] },
        ],
        image_url: "",
        name: roomName,
        type: "DM",
        requires_approval: "false",
      });
    }
  };

  return (
    <Link
      to={`/chat?room=DMto${props.friend._id}&userType=user&roomType=DM&receiver=${props.friend.username}`}
      className="friend-item-div-button"
      title={props.text || "Direct Message"}
      onClick={(e) => {
        e.stopPropagation();
        sendMessageOnClickHandler();
      }}
    >
      <img
        className={`friend-action-button-image`}
        src={ChatIconImg}
        alt="Chat Bubble Icon"
      />
    </Link>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  // directMessage,
  addActiveDmRoom,
})(DirectMessage);
