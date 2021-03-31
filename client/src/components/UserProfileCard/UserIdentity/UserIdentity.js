import EllipsisImg from "../../../icons/ellipsis.png";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import { UserProfileCardContext, WindowContext } from "../../AppContext";
import { addFriendWithId } from "../../../flux/actions/friendsActions";
import { addActiveDmRoom } from "../../../flux/actions/dmRoomsActions";

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
  const renderDesktopActionButton = () => {
    if (
      !isDesktopWidth ||
      !isDesktopHeight ||
      props.isCurrentUser
      // ||notfriends
    )
      return null;

    if (props.connectionToUser === "accepted") {
      return (
        <Link
          onClick={props.sendMessageOnClickHandler}
          to={`/chat?room=DMto${selectedUser._id}&userType=user&roomType=DM&receiver=${selectedUser.username}`}
        >
          <button className="user-identity-action-button">Send Message</button>
        </Link>
      );
    } else if (props.connectionToUser === "requested") {
      return (
        <button className="user-identity-action-button" disabled={true}>
          Friend Request Sent
        </button>
      );
    } else if (!props.connectionToUser) {
      return (
        <button
          className="user-identity-action-button"
          onClick={props.addFriend}
        >
          Add Friend
        </button>
      );
    }
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
      {renderDesktopActionButton()}
      {renderEllipsisButton()}
    </section>
  );
};

export default UserIdentity;
