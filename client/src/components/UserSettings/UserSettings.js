import LogoutImg from "../../icons/logout.png";

import "./UserSettings.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import UserInfo from "../UserInfo/UserInfo";

// import { renderError, getErrorClass } from "../../helpers";

const UserSettings = (props) => {
  const [myAccountOpened, setMyAccountOpened] = useState(false);
  const [appearanceOpened, setAppearanceOpened] = useState(false);
  const [friendsOpened, setFriendsOpened] = useState(false);

  const renderSection = () => {
    if (myAccountOpened) {
      console.log("Opening my account");
      return <UserInfo userId={props.match.params.id} />;
    } else if (appearanceOpened) {
      // return <UserInfo userId={props.match.params.id} />;
    } else if (friendsOpened) {
      // return <UserInfo userId={props.match.params.id} />;
    }
    return null;
  };
  useEffect(() => {
    console.log(props.match.params.id);
  }, []);
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

              <button
                className="user-settings-sidebar-button"
                onClick={() => {
                  setMyAccountOpened(true);
                  setAppearanceOpened(false);
                  setFriendsOpened(false);
                }}
              >
                <li className="user-settings-sidebar-item">My Account</li>
              </button>
              <button
                className="user-settings-sidebar-button"
                onClick={() => {
                  setMyAccountOpened(false);
                  setAppearanceOpened(true);
                  setFriendsOpened(false);
                }}
              >
                <li className="user-settings-sidebar-item">Appearance</li>
              </button>
              <button
                className="user-settings-sidebar-button"
                onClick={() => {
                  setMyAccountOpened(false);
                  setAppearanceOpened(false);
                  setFriendsOpened(true);
                }}
              >
                <li className="user-settings-sidebar-item">Friends</li>
              </button>
            </ul>
          </div>
        </div>
        {renderSection()}
        <button className="" id="user-settings-close-button">
          x
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
