import logo from "../../uploads/rorobot.png";
import DefaultAvatarImg from "../../images/default-avatar.jpg";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({ imageSrc, componentClass }) => {
  const getComponentClass = () => {
    return componentClass ? componentClass : "";
  };

  if (!imageSrc) {
    // return null;
  }

  return (
    <div className={`profile-picture-outer-container ${getComponentClass()}`}>
      <div className={`profile-picture-inner-container ${getComponentClass()}`}>
        <img
          className={`profile-picture-image ${getComponentClass()}`}
          src={imageSrc || DefaultAvatarImg}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
