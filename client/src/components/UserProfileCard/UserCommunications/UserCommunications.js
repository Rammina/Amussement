import ChatIconImg from "../../../icons/chat.png";
import AddFriendIconImg from "../../../icons/add-user-2.png";
import ClockIconImg from "../../../icons/clock.png";

import React from "react";

import Button from "./Button/Button";

const UserCommunications = (props) => {
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
        <Button text="Pending" className="pending" onClick={() => {}}>
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
      <Button text="Message">
        <img
          className={`user-profile-card-button-image`}
          src={ChatIconImg}
          alt="Chat Bubble Icon"
        />
      </Button>
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
