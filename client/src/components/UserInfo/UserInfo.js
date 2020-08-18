// import DoorImg from "../../icons/door.png";

import "./UserInfo.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import EditAccount from "../forms/EditAccount";

// import { renderError, getErrorClass } from "../../helpers";

const UserInfo = (props) => {
  const [editAccountOpened, setEditAccountOpened] = useState(false);

  useEffect(() => {
    // userinfo needs to get the ID from the parent component
    console.log(props.userId);
  }, []);

  const renderSection = () => {
    if (editAccountOpened) {
      console.log("Opening edit account");
      return (
        <EditAccount
          initialValues={props.user}
          closeEditAccount={() => {
            setEditAccountOpened(false);
          }}
        />
      );
    }
    return null;
  };

  const getUsername = () => (props.user ? props.user.username : null);
  const getEmail = () => (props.user ? props.user.email : null);

  return (
    <div className="user-settings-content-container">
      {renderSection()}
      <div className="user-settings-section-container">
        <div className="user-settings-content-header">
          <h1 className="user-settings-section-heading">My Account</h1>
        </div>
        <div className="profile-container">
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

        <div className="two-buttons-container" id="profile-buttons-container">
          <button
            className="profile-button"
            id="profile-edit-button"
            onClick={() => {
              setEditAccountOpened(true);
            }}
          >
            Edit Account
          </button>
          <button className="profile-button" id="profile-edit-button">
            Change Password
          </button>
        </div>
      </div>
      <div className="user-settings-section-container"></div>
    </div>
  );
};
{
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  // error: state.error
});

const userInfo = connect(mapStateToProps, {})(UserInfo);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
