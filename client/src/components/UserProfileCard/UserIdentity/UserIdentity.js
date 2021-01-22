import EllipsisImg from "../../../icons/ellipsis.png";

import React, { useContext } from "react";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import { UserProfileCardContext } from "../../AppContext";

const UserIdentity = (props) => {
  const { selectedUser } = useContext(UserProfileCardContext);
  const renderAvatar = (className) => {
    // guard against undefined
    const avatarUrl = selectedUser ? selectedUser.image_url : "";
    return (
      <ProfilePicture imageSrc={avatarUrl || ""} componentClass={className} />
    );
  };

  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container">
      {renderAvatar("user-profile-card")}

      <h3 id="user-profile-card-username">
        {selectedUser.username}
        {/*{props.friend.username}*/}
      </h3>
      <button id="user-profile-card-ellipsis-button">
        <img
          className={`ellipsis-icon-img`}
          src={EllipsisImg}
          alt="Ellipsis icon"
        />
      </button>
    </section>
  );
};

export default UserIdentity;
