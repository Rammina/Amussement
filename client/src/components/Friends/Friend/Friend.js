import "./Friend.scss";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../../apis/serverRest";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
// import { renderError, getErrorClass } from "../../helpers";

const Friend = props => {
  useEffect(() => {
    console.log(props.friend);
  }, []);

  const location = useLocation();

  const renderAvatar = () => {
    const avatarUrl = props.friend.friend.image_url;
    return (
      <ProfilePicture imageSrc={avatarUrl || ""} componentClass="friend" />
    );
  };

  const renderStatus = () => {
    if (props.friend.status === "pending") {
      return (
        <div className="friend-item-div status pending">
          Incoming friend request
        </div>
      );
    } else if (props.friend.status === "requested") {
      return (
        <div className="friend-item-div status requested">
          Sent friend request
        </div>
      );
    }
    return <div className="friend-item-div status added"></div>;
  };

  const renderFriend = () => {
    return (
      <Link
        to={`${location.pathname}/${props.friend.friend._id}`}
        className="friend-item-link"
      >
        <li className="friend-item">
          <div className="friend-item-div information">
            <div className="friend-item-avatar-container">{renderAvatar()}</div>
            <span className="friend-item-username">
              {props.friend.friend.username}
            </span>
          </div>
          {renderStatus()}
          <div className="friend-item-div actions">
            <button className="friend-item-div-button"> call</button>
            {/*note:this should lead to a direct message instance/component*/}
            <Link className="friend-item-div-button">direct message</Link>
          </div>
        </li>
      </Link>
    );
  };

  return <React.Fragment>{renderFriend()}</React.Fragment>;
};
/*
const mapStateToProps = state => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error
});
*/
const friendComponent = connect(
  null,
  {}
)(Friend);

export default friendComponent;
