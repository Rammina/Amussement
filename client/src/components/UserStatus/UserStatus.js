import FriendsImg from "../../icons/friends.png";
import SettingsImg from "../../icons/settings.png";

import "./UserStatus.scss";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import HoverMarker from "../UIComponents/HoverMarker/HoverMarker";

const UserStatus = (props) => {
  const [settingsMarkerX, setSettingsMarkerX] = useState(-200);
  const [settingsMarkerY, setSettingsMarkerY] = useState(-200);
  const [friendsMarkerX, setFriendsMarkerX] = useState(-200);
  const [friendsMarkerY, setFriendsMarkerY] = useState(-200);
  const [isMouseHovered, setIsMouseHovered] = useState(false);

  return props.user ? (
    <div className="user-status-outer-container">
      <div className="user-status-user-container">
        <ProfilePicture
          imageSrc={props.user.image_url || ""}
          componentClass={`sidebar`}
          // onClick={userOnClickHandler}
          // onContextMenu={userOnContextMenuHandler}
        />
        <span className="user-status-item-text">{props.user.username}</span>
      </div>
      <div className="user-status-buttons-container">
        <Link
          className="user-status-button"
          to={`users/${props.user._id}/friends`}
        >
          <img
            className="user-status-button-image"
            src={FriendsImg}
            alt="Group Icon"
          />
        </Link>
        <Link
          className="user-status-button"
          to={`users/${props.user._id}/settings`}
        >
          <img
            className="user-status-button-image"
            src={SettingsImg}
            alt="Gear Icon"
          />
        </Link>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {})(UserStatus);
