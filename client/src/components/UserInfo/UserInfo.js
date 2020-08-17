// import DoorImg from "../../icons/door.png";

import "./UserInfo.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

// import { renderError, getErrorClass } from "../../helpers";

const UserInfo = (props) => {
  return (
    <div className="profile-container">
      <div className="" id="profile-large-image-container">
        <img id="user-large-image" />
      </div>
      <div className="" id="profile-information-container">
        <p className="profile-information" id="profile-username">
          Sophie
        </p>
        <p className="profile-information" id="profile-email">
          mayiscute@Gmail.com
        </p>
        <p className="profile-information" id="profile-image-remove">
          Remove Image
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // error: state.error
});

const userInfo = connect(mapStateToProps, {})(UserInfo);

export default UserInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
