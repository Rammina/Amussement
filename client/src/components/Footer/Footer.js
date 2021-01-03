import ChatBubbleImg from "../../icons/chat.png";
import FriendsImg from "../../icons/friends.png";
import SettingsImg from "../../icons/settings.png";

import "./Footer.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Footer = props => {
  const userId = props.user ? props.user._id || props.user.id : null;

  useEffect(() => {}, []);

  const renderFooter = () => {
    // do not render on higher width breakpoint
    if (window.innerWidth >= 1000) {
      // return null;
    }
    return (
      <footer className="" id="user-footer-container">
      <div className="" id="user-footer-content-container">
        <Link className="user-footer-link" to={`/users/${userId}/home`} title="Chat">
        <img
          className={`footer-button-image`}
          src={ChatBubbleImg}
          alt="Message Bubble"
        />
        </Link>
        <Link className="user-footer-link" to={`/users/${userId}/friends`} title="Friends">
        <img
          className={`footer-button-image`}
          src={FriendsImg}
          alt="Friends Icon"
        />
        </Link>
        <Link className="user-footer-link" to={`/users/${userId}/settings`} title="Settings">
        <img
          className={`footer-button-image`}
          src={SettingsImg}
          alt="Gear Icon"
        />
        </Link>
      </div>
  </footer>
);
  };

  return <React.Fragment>{renderFooter()}</React.Fragment>;
};

const mapStateToProps = state => ({
  user: state.user.info
});

const footer = connect(
  mapStateToProps,
  {}
)(Footer);

export default footer;
