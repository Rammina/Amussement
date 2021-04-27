import LogoutImg from "../../icons/logout.png";

import "../SettingsPage.scss";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import UserInfo from "../UserInfo/UserInfo";

import SettingsCloseButton from "../buttons/SettingsCloseButton";

import { logout } from "../../flux/actions/authActions";
import { clearFriendsList } from "../../flux/actions/friendsActions";

import { WindowContext } from "../AppContext";

const UserSettings = (props) => {
  const { id } = useParams();
  const [myAccountOpened, setMyAccountOpened] = useState(false);
  const [appearanceOpened, setAppearanceOpened] = useState(false);
  const [friendsOpened, setFriendsOpened] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  useEffect(() => {
    if (isDesktopWidth && isDesktopHeight) setMyAccountOpened(true);

    return () => {
      if (props.setShowUserSettings) props.setShowUserSettings(false);
    };
  }, []);

  // function handlers
  const onLogoutClick = () => {
    props.logout();
    props.clearFriendsList();
  };

  // render functions
  const renderSection = () => {
    if (!isDesktopWidth || !isDesktopHeight) {
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
        <button id="settings-page-logout-button" onClick={onLogoutClick}>
          <img className="logout-icon-img" src={LogoutImg} alt="Logout Icon" />
        </button>
      </span>
    );
  };

  const renderDesktopLogOut = () => {
    if (!isDesktopWidth) return null;
    return (
      <button
        className="settings-page-sidebar-button"
        id="settings-page-desktop-logout-button"
        onClick={onLogoutClick}
      >
        <li
          className={`settings-page-sidebar-item`}
          id="settings-page-desktop-logout"
        >
          Log Out
        </li>
      </button>
    );
  };

  // render
  return (
    <div className="settings-page-window-container">
      <div className="settings-page-outer-flex-container">
        <div className="settings-page-sidebar-outer-container">
          <div className="settings-page-sidebar-middle-container">
            <header className="settings-page-sidebar-header">
              <h1 className="settings-page-header-heading">User Settings</h1>
              {renderHeaderLogOut()}
            </header>
            <div className="settings-page-sidebar-inner-container">
              <ul className="settings-page-sidebar-items">
                <button
                  className="settings-page-sidebar-button"
                  onClick={() => {
                    setMyAccountOpened(true);
                    setAppearanceOpened(false);
                    setFriendsOpened(false);
                  }}
                >
                  <li
                    className={`settings-page-sidebar-item ${
                      myAccountOpened ? "selected" : ""
                    }`}
                  >
                    My Account
                  </li>
                </button>

                {renderDesktopLogOut()}
              </ul>
            </div>
          </div>
        </div>
        <div className="settings-page-sidebar-outer-container fake"></div>

        {renderSection()}

        <SettingsCloseButton onClose={props.settingsOnCloseHandler} />
      </div>
    </div>
  );
};

const userSettings = connect(null, { logout, clearFriendsList })(UserSettings);

export default userSettings;

/* 
else if (appearanceOpened) {
        // return <UserInfo userId={id} />;
      } else if (friendsOpened) {
        // return <UserInfo userId={id} />;
      }
*/
