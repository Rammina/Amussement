import LogoutImg from "../../icons/logout.png";

import "./UserSettings.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import history from "../../history";

import UserInfo from "../UserInfo/UserInfo";
import Footer from "../Footer/Footer";
import CloseButton from "../buttons/CloseButton";

import { logout } from "../../flux/actions/authActions";
import { clearFriendsList } from "../../flux/actions/friendsActions";

import { WindowContext } from "../AppContext";
// import { renderError, getErrorClass } from "../../helpers";

const UserSettings = (props) => {
  const { id } = useParams();
  const [myAccountOpened, setMyAccountOpened] = useState(false);
  const [appearanceOpened, setAppearanceOpened] = useState(false);
  const [friendsOpened, setFriendsOpened] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  useEffect(() => {
    if (isDesktopWidth && isDesktopHeight) setMyAccountOpened(true);
  }, []);

  // function handlers
  const onLogoutClick = () => {
    props.logout();
    props.clearFriendsList();
  };

  // render functions
  const renderSection = () => {
    if (!isDesktopWidth || !isDesktopHeight) {
      // if(isDesktopWidth) return null;
      if (myAccountOpened) {
        console.log("Opening my account");
        return (
          <UserInfo
            userId={id}
            closeMyAccount={() => {
              setMyAccountOpened(false);
            }}
          />
        );
      } else if (appearanceOpened) {
        // return <UserInfo userId={id} />;
      } else if (friendsOpened) {
        // return <UserInfo userId={id} />;
      }
    } else {
      // this is for desktop versions of the components
      if (myAccountOpened || (!appearanceOpened && !friendsOpened)) {
        console.log("Opening my account on desktop with");
        return (
          <UserInfo
            isDesktopWidth={true}
            isDesktopHeight={true}
            userId={id}
            closeMyAccount={() => {
              setMyAccountOpened(false);
            }}
          />
        );
      }
    }
    return null;
  };

  const renderHeaderLogOut = () => {
    if (isDesktopWidth) return null;
    return (
      <span>
        <button id="user-settings-logout-button" onClick={onLogoutClick}>
          <img className="logout-icon-img" src={LogoutImg} alt="Logout Icon" />
        </button>
      </span>
    );
  };

  const renderDesktopLogOut = () => {
    if (!isDesktopWidth) return null;
    return (
      <button
        className="user-settings-sidebar-button"
        id="user-settings-desktop-logout-button"
        onClick={onLogoutClick}
      >
        <li
          className={`user-settings-sidebar-item`}
          id="user-settings-desktop-logout"
        >
          Log Out
        </li>
      </button>
    );
  };

  const renderContent = () => {
    if (props.content) {
      return props.content;
    }
    return null;
  };

  // render
  return (
    <div className="user-settings-page-container">
      <div className="user-settings-outer-flex-container">
        <div className="user-settings-sidebar-outer-container">
          <div className="user-settings-sidebar-middle-container">
            <header className="user-settings-sidebar-header">
              <h1 className="user-settings-header-heading">User Settings</h1>
              {renderHeaderLogOut()}
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
                  <li
                    className={`user-settings-sidebar-item ${
                      myAccountOpened ? "selected" : ""
                    }`}
                  >
                    My Account
                  </li>
                </button>
                <button
                  className="user-settings-sidebar-button"
                  onClick={() => {
                    setMyAccountOpened(false);
                    setAppearanceOpened(true);
                    setFriendsOpened(false);
                  }}
                >
                  <li
                    className={`user-settings-sidebar-item ${
                      appearanceOpened ? "selected" : ""
                    }`}
                  >
                    Appearance
                  </li>
                </button>
                <button
                  className="user-settings-sidebar-button"
                  onClick={() => {
                    setMyAccountOpened(false);
                    setAppearanceOpened(false);
                    setFriendsOpened(true);
                  }}
                >
                  <li
                    className={`user-settings-sidebar-item ${
                      friendsOpened ? "selected" : ""
                    }`}
                  >
                    Friends
                  </li>
                </button>
                {renderDesktopLogOut()}
              </ul>
            </div>
          </div>
        </div>
        <div className="user-settings-sidebar-outer-container fake"></div>

        {renderSection()}

        {/*  <button
          className=""
          id="user-settings-close-button"
          onClick={() => {
            //note: re-\ implement this because it's buggy right now
            // history.goBack();
            history.push(`/users/${id}/home`);
          }}
        >
          x
        </button>
        */}
      </div>
    </div>
  );
};

const userSettings = connect(null, { logout, clearFriendsList })(UserSettings);

export default userSettings;
