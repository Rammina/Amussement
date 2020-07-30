import logo from "../../uploads/rorobot.png";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({ imageAddress, imageSrc }) => {
  if (!imageAddress) {
    // return null;
  }

  return (
    <div className="profile-picture-outer-container">
      <div className="profile-picture-inner-container">
        <img
          className="profile-picture-image"
          // href={imageAddress || ""}
          src={logo}
          // src={imageSrc || "no description"}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
