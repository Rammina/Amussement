import logo from "../../uploads/rorobot.png";
import DefaultAvatarImg from "../../images/default-avatar.jpg";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({ imageSrc, componentClass }) => {
  const getClassName = () => (componentClass ? componentClass : "");

  if (!imageSrc) {
    // return null;
  }

  return (
    <div className={`profile-picture-outer-container ${getClassName()}`}>
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
