import LogoutImg from "../../icons/logout.png";

import "./UserSettings.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import UserInfo from "../UserInfo/UserInfo";

// import { renderError, getErrorClass } from "../../helpers";

const UserSettings = (props) => {
  return (
    <div className="user-settings-page-container">
      <div className="user-settings-outer-flex-container">
        <div className="user-settings-sidebar-outer-container">
          <header className="user-settings-sidebar-header">
            <h1 className="user-settings-header-heading">User Settings</h1>
            <span>
              <button id="user-settings-logout-button">
                <img
                  className="logout-icon-img"
                  src={LogoutImg}
                  alt="Logout Icon"
                />
              </button>
            </span>
          </header>
          <div className="user-settings-sidebar-inner-container">
            <ul className="user-settings-sidebar-items">
              {
                // <Link to={`users/${userId}/settings/account`} className="user-settings-sidebar-link">
              }
              <Link to={"/"} className="user-settings-sidebar-link">
                <li className="user-settings-sidebar-item">My Account</li>
              </Link>
              <Link to={"/"} className="user-settings-sidebar-link">
                <li className="user-settings-sidebar-item">Appearance</li>
              </Link>
              <Link to={"/"} className="user-settings-sidebar-link">
                <li className="user-settings-sidebar-item">Friends</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="user-settings-content-container">
          <div className="user-settings-section-container">
            <div className="user-settings-content-header">
              <h1 className="user-settings-section-heading">My Account</h1>
            </div>
            <UserInfo />
            <div
              className="two-buttons-container"
              id="profile-buttons-container"
            >
              <button className="profile-button" id="profile-edit-button">
                Edit Account
              </button>
              <button className="profile-button" id="profile-edit-button">
                Change Password
              </button>
            </div>
          </div>
          <div className="user-settings-section-container"></div>
        </div>

        <button className="" id="user-settings-close-button">
          x
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
