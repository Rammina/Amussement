import CloseIconImg from "../../../../icons/close-icon.png";

import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

import { removeFriend } from "../../../../flux/actions/friendsActions";

import "./RemoveFriend.scss";

const RemoveFriend = (props) => {
  return (
    <button
      className="friend-item-div-button"
      title={props.text || "Remove Friend"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // remove this friend
        props.removeFriend(props.friend._id);
      }}
    >
      <img
        className={`friend-action-button-image danger`}
        src={CloseIconImg}
        alt="X Icon"
      />
    </button>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {
  removeFriend,
})(RemoveFriend);
