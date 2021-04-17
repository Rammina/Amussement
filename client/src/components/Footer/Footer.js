import ChatBubbleImg from "../../icons/chat.png";
import FriendsImg from "../../icons/friends.png";
import SettingsImg from "../../icons/settings.png";

import "./Footer.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { FooterContext, UserSettingsContext } from "../AppContext";

const Footer = (props) => {
  const userId = props.user ? props.user._id || props.user.id : null;
  const pathname = useLocation().pathname;
  const { showFooter } = useContext(FooterContext);
  const { settingsOnOpenHandler } = useContext(UserSettingsContext);

  useEffect(() => {}, []);

  const getHomeButtonClass = () =>
    (pathname.includes("/home") && pathname.includes("/users")) ||
    pathname.includes("/chat")
      ? "selected"
      : "";
  const getFriendsButtonClass = () =>
    pathname.includes("/friends") && pathname.includes("/users")
      ? "selected"
      : "";
  const getSettingsButtonClass = () =>
    pathname.includes("/settings") && pathname.includes("/users")
      ? "selected"
      : "";

  const getShowFooterClass = () => (showFooter ? "show" : "hide");

  const renderFooter = () => {
    if (!props.user) return null;
    if (pathname.includes("/register") || pathname.includes("login"))
      return null;
    // do not render on higher width breakpoint
    if (window.innerWidth >= 1000) {
      // return null;
    }
    return (
      <footer className={`${getShowFooterClass()}`} id="user-footer-container">
        <div className="" id="user-footer-content-container">
          <Link
            className={`user-footer-link ${getHomeButtonClass()}`}
            to={`/users/${userId}/home`}
            title="Home"
          >
            <img
              className={`footer-button-image`}
              src={ChatBubbleImg}
              alt="Message Bubble"
            />
          </Link>
          <Link
            className={`user-footer-link ${getFriendsButtonClass()}`}
            to={`/users/${userId}/friends`}
            title="Friends"
          >
            <img
              className={`footer-button-image`}
              src={FriendsImg}
              alt="Friends Icon"
            />
          </Link>
          <Link
            className={`user-footer-link ${getSettingsButtonClass()}`}
            title="Settings"
            to={`/users/${props.user._id}/settings`}
          >
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

const mapStateToProps = (state) => ({
  user: state.user.info,
});

const footer = connect(mapStateToProps, {})(Footer);

export default footer;
