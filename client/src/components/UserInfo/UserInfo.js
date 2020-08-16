// import DoorImg from "../../icons/door.png";

import "./UserInfo.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

// import { renderError, getErrorClass } from "../../helpers";

const UserInfo = props => {
  return (
    <div className="user-account-profile-container">
      <div className="" id="user-account-profile-large-image-container">
        <img id="user-large-image" />
      </div>
      <div className="" id="user-account-profile-information-container">
        <p
          className="user-account-profile-information"
          id="user-account-profile-username"
        >
          Sophie
        </p>
        <p
          className="user-account-profile-information"
          id="user-account-profile-email"
        >
          mayiscute@Gmail.com
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
  // error: state.error
});

const userInfo = connect(
  mapStateToProps,
  {}
)(UserInfo);

export default UserInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
