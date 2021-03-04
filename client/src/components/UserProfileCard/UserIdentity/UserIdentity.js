import EllipsisImg from "../../../icons/ellipsis.png";

import React, { useContext } from "react";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import { UserProfileCardContext, WindowContext } from "../../AppContext";

const UserIdentity = (props) => {
  const { selectedUser } = useContext(UserProfileCardContext);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const renderAvatar = (className) => {
    // guard against undefined
    const avatarUrl = selectedUser ? selectedUser.image_url : "";
    return (
      <ProfilePicture imageSrc={avatarUrl || ""} componentClass={className} />
    );
  };
  const renderSendMessage = () => {
    if (
      !isDesktopWidth ||
      !isDesktopHeight ||
      props.isCurrentUser
      // ||notfriends
    )
      return null;
    if (props.connectionToUser === "accepted") {
      return (
        <button className="user-identity-action-button">Send Message</button>
      );
    } else if (props.connectionToUser === "requested") {
      return (
        <button className="user-identity-action-button" disabled={true}>
          Friend Request Sent
        </button>
      );
    }
  };

  const renderSendFriendRequest = () => {
    if (props.isFriendsWithCurrentUser) return null;
    return (
      <button className="user-identity-action-button">
        Send Friend Request
      </button>
    );
  };

  const renderEllipsisButton = () =>
    !props.isCurrentUser ? (
      <button id="user-profile-card-ellipsis-button">
        <img
          className={`ellipsis-icon-img`}
          src={EllipsisImg}
          alt="Ellipsis icon"
        />
      </button>
    ) : null;

  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container user-identity">
      {renderAvatar("user-profile-card")}

      <h3 id="user-profile-card-username">
        {selectedUser.username}
        {/*{props.friend.username}*/}
      </h3>
      {renderSendMessage()}
      {renderEllipsisButton()}
    </section>
  );
};

export default UserIdentity;
