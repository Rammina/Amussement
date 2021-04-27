import FriendsImg from "../../icons/friends.png";
import SettingsImg from "../../icons/settings.png";

import "./UserStatus.scss";

import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import HoverMarker from "../UIComponents/HoverMarker/HoverMarker";

import { UserSettingsContext } from "../AppContext";

const UserStatus = (props) => {
  const [isMouseHoveredOnFriends, setIsMouseHoveredOnFriends] = useState(false);
  const [isMouseHoveredOnSettings, setIsMouseHoveredOnSettings] = useState(
    false
  );
  const { settingsOnOpenHandler } = useContext(UserSettingsContext);

  const onMouseEnterFriendsHandler = () => {
    setIsMouseHoveredOnFriends(true);
  };

  const onMouseLeaveFriendsHandler = () => {
    setIsMouseHoveredOnFriends(false);
  };

  const onMouseEnterSettingsHandler = () => {
    setIsMouseHoveredOnSettings(true);
  };

  const onMouseLeaveSettingsHandler = () => {
    setIsMouseHoveredOnSettings(false);
  };

  return props.user ? (
    <div className="user-status-outer-container">
      <div className="user-status-user-container">
        <ProfilePicture
          imageSrc={props.user.image_url || ""}
          componentClass={`sidebar`}
        />
        <span className="user-status-item-text">{props.user.username}</span>
      </div>
      <div className="user-status-buttons-container">
        <div className="user-status-button-container">
          <HoverMarker
            className="user-status"
            isShown={isMouseHoveredOnFriends}
            textContent="Friends"
          />
          <Link
            className="user-status-button"
            to={`/users/${props.user._id}/home`}
            onMouseEnter={onMouseEnterFriendsHandler}
            onMouseLeave={onMouseLeaveFriendsHandler}
          >
            <img
              className="user-status-button-image"
              src={FriendsImg}
              alt="Group Icon"
            />
          </Link>
        </div>
        <div className="user-status-button-container">
          <HoverMarker
            className="user-status"
            isShown={isMouseHoveredOnSettings}
            textContent="Settings"
          />
          <button
            className="user-status-button"
            onClick={settingsOnOpenHandler}
            onMouseEnter={onMouseEnterSettingsHandler}
            onMouseLeave={onMouseLeaveSettingsHandler}
          >
            <img
              className="user-status-button-image"
              src={SettingsImg}
              alt="Gear Icon"
            />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {})(UserStatus);
