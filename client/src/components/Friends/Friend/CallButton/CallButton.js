import CallIconImg from "../../../../icons/call.png";

import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

// import { callButton } from "../../../../flux/actions/friendsActions";

import "./CallButton.scss";

const CallButton = (props) => {
  return (
    <button
      className="friend-item-div-button"
      title={props.text || "Voice Call"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // remove this friend
        // props.callButton(props.friend._id);
      }}
    >
      <img
        className={`friend-action-button-image`}
        src={CallIconImg}
        alt="Call Icon Image"
      />
    </button>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {
  // callButton,
})(CallButton);
