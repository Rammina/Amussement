import ChatIconImg from "../../../icons/chat.png";
import AddFriendIconImg from "../../../icons/add-user-2.png";
import ClockIconImg from "../../../icons/clock.png";

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserProfileCardContext } from "../../AppContext";

import Button from "./Button/Button";

const UserCommunications = (props) => {
  const { selectedUser } = useContext(UserProfileCardContext);
  const renderFriendButton = () => {
    // do not render add friend button if already friends
    if (props.connectionToUser === "accepted") return null;
    if (!props.connectionToUser)
      return (
        <Button
          text="Add Friend"
          className="add-friend"
          onClick={props.addFriend}
        >
          <img
            className={`user-profile-card-button-image add-friend`}
            src={AddFriendIconImg}
            alt="Add Friend Icon"
          />
        </Button>
      );
    if (props.connectionToUser === "requested")
      return (
        <Button
          text="Pending"
          className="pending"
          onClick={props.openRemoveFriend}
        >
          <img
            className={`user-profile-card-button-image pending`}
            src={ClockIconImg}
            alt="Clock Icon"
          />
        </Button>
      );
    if (props.connectionToUser === "pending")
      return (
        <Button text="Accept Request" onClick={() => {}}>
          {/*<img
        className={`user-profile-card-button-image`}
        src={ClockIconImg}
        alt="Clock Icon"
      />
    */}
        </Button>
      );
  };

  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container buttons-container">
      <Link
        onClick={props.sendMessageOnClickHandler}
        to={`/chat?room=DMto${selectedUser._id}&userType=user&roomType=DM&receiver=${selectedUser.username}`}
      >
        <Button text="Message">
          <img
            className={`user-profile-card-button-image`}
            src={ChatIconImg}
            alt="Chat Bubble Icon"
          />
        </Button>
      </Link>
      {renderFriendButton()}
    </section>
  );
};

export default UserCommunications;

//note: these functionalities are not implemented yet
/*
<button className="user-profile-card-button" onClick={() => {}}>
  Call
</button>
<button className="user-profile-card-button" onClick={() => {}}>
  Video
</button>
*/
