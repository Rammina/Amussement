import CallIconImg from "../../../../icons/call.png";

import React from "react";

import { connect } from "react-redux";

import "./CallButton.scss";

const CallButton = (props) => {
  return (
    <button
      className="friend-item-div-button"
      title={props.text || "Voice Call"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
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

export default connect(mapStateToProps, {})(CallButton);
