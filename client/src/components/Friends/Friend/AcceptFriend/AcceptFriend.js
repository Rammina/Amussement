import CheckIconImg from "../../../../icons/check.png";

import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

import { addFriendWithId } from "../../../../flux/actions/friendsActions";

import "./AcceptFriend.scss";

const AcceptFriend = (props) => {
  return (
    <button
      className="friend-item-div-button accept-friend"
      title={props.text || "Accept as Friend"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // accept request by adding this friend (sending another friend request in response changes the status to accepted)
        props.addFriendWithId(props.friend._id);
      }}
    >
      <img
        className={`friend-action-button-image accept-friend`}
        src={CheckIconImg}
        alt="Check Icon Image"
      />
    </button>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {
  addFriendWithId,
})(AcceptFriend);
