// import DoorImg from "../../icons/door.png";

import "./UserInfo.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import EditAccount from "../forms/EditAccount";

// import { renderError, getErrorClass } from "../../helpers";

const UserInfo = props => {
  useEffect(() => {
    // userinfo needs to get the ID from the parent component
    console.log(props.userId);
  }, []);

  const getUsername = () => (props.user ? props.user.username : null);
  const getEmail = () => (props.user ? props.user.email : null);

  return <EditAccount initialValues={props.user} />;
  /*    <div className="profile-container">

      <div className="" id="profile-large-image-container">
        <img id="user-large-image" />
      </div>
      <div className="" id="profile-information-container">
        <p className="profile-information" id="profile-username">
          {getUsername()}
        </p>
        <p className="profile-information" id="profile-email">
          {getEmail()}
        </p>
        <p className="profile-information" id="profile-image-remove">
          Remove Image
        </p>
      </div>
    </div>
  );
  */
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
  // error: state.error
});

const userInfo = connect(
  mapStateToProps,
  {}
)(UserInfo);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
