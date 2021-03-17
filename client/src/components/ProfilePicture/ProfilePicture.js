import logo from "../../uploads/rorobot.png";
import DefaultAvatarImg from "../../images/default-avatar.jpg";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({
  imageSrc,
  componentClass,
  onClick,
  onContextMenu,
}) => {
  const getClassName = () => (componentClass ? componentClass : "");

  if (!imageSrc) {
    // return null;
  }

  const onClickHandler = (e) => {
    if (onClick !== undefined) onClick(e);
  };

  const onContextMenuHandler = (e) => {
    if (onContextMenu !== undefined) onContextMenu(e);
  };

  return (
    <div
      className={`profile-picture-outer-container ${getClassName()}`}
      onClick={onClickHandler}
      onContextMenu={onContextMenuHandler}
    >
      <div className={`profile-picture-inner-container ${getClassName()}`}>
        <img
          className={`profile-picture-image ${getClassName()}`}
          src={imageSrc || DefaultAvatarImg}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
