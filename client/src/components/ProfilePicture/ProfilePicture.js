import logo from "../../uploads/rorobot.png";
import DefaultAvatarImg from "../../images/default-avatar.jpg";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({ imageSrc, componentClass, onClick }) => {
  const getClassName = () => (componentClass ? componentClass : "");

  if (!imageSrc) {
    // return null;
  }

  const onClickHandler = () => {
    if (onClick !== undefined) onClick();
  };

  return (
    <div
      className={`profile-picture-outer-container ${getClassName()}`}
      onClick={onClickHandler}
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
