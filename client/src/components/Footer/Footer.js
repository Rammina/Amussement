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
        <Link className="user-footer-link" to={`/users/${userId}/home`}>
          Chat
        </Link>
        <Link className="user-footer-link" to={`/users/${userId}/friends`}>
          Friends
        </Link>
        <Link className="user-footer-link" to={`/users/${userId}/settings`}>
          Account
        </Link>
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
