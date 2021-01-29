import "./Friend.scss";

import React, { useState, useEffect } from "react";
import { Route, Link, useLocation } from "react-router-dom";
// import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../../apis/serverRest";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import AcceptFriend from "./AcceptFriend/AcceptFriend";
import RemoveFriend from "./RemoveFriend/RemoveFriend";
import CallButton from "./CallButton/CallButton";
import DirectMessage from "./DirectMessage/DirectMessage";
import FriendProfileModal from "./FriendProfileModal/FriendProfileModal";
import UserProfileCard from "../../UserProfileCard/UserProfileCard";

import { UserProfileCardContext } from "../../AppContext";

// import { renderError, getErrorClass } from "../../helpers";

const Friend = (props) => {
  const [friendInfoModalOpen, setFriendInfoModalOpen] = useState(false);
  useEffect(() => {
    console.log(props.friend);
  }, []);

  // friend variables from props
  const { friend, status } = props.friend;
  const location = useLocation();

  // get value  of UserProfileCardContext using this function
  const getUserProfileCardContextValue = () => {
    return { selectedUser: friend, friendStatus: status };
  };

  const getFriendInfoModalClass = () => {
    return friendInfoModalOpen ? "show" : "hide";
  };

  const renderAvatar = (className) => {
    const avatarUrl = friend.image_url;
    return (
      <ProfilePicture imageSrc={avatarUrl || ""} componentClass={className} />
    );
  };

  const renderStatus = () => {
    if (status === "pending") {
      return (
        <div className="friend-item-div status pending">
          Incoming friend request
        </div>
      );
    } else if (status === "requested") {
      return (
        <div className="friend-item-div status requested">
          Sent friend request
        </div>
      );
    }
    return <div className="friend-item-div status added"></div>;
  };

  const renderFriendActionButtons = () => {
    console.log(status);
    const renderButtons = () => {
      if (status === "requested") {
        return (
          <>
            <RemoveFriend friend={friend} text="Cancel Request" />
          </>
        );
      } else if (status === "pending") {
        return (
          <>
            <AcceptFriend friend={friend} />
            <RemoveFriend friend={friend} text="Reject" />
          </>
        );
      } else if (status === "accepted") {
        return (
          <>
            <CallButton />
            {/*note:this should lead to a direct message instance/component*/}
            <DirectMessage />
          </>
        );
      }
    };

    return <div className="friend-item-div actions">{renderButtons()}</div>;
  };

  const renderFriendInfoModal = () => {
    if (!friendInfoModalOpen) return null;

    return (
      <UserProfileCardContext.Provider value={getUserProfileCardContextValue()}>
        <UserProfileCard
          componentClass="friend-profile"
          onModalClose={() => {
            setFriendInfoModalOpen(false);
          }}
        />
      </UserProfileCardContext.Provider>
    );
  };

  const renderFriend = () => {
    return (
      <React.Fragment>
        <div
          className="friend-item-container"
          onClick={() => {
            setFriendInfoModalOpen(true);
          }}
        >
          <li className="friend-item">
            <div className="friend-item-div information">
              <div className="friend-item-avatar-container">
                {renderAvatar("friend-list")}
              </div>
              <span className="friend-item-username">{friend.username}</span>
            </div>
            {renderStatus()}
            {/*friend action buttons should be here*/}
            {renderFriendActionButtons()}
          </li>
        </div>
        {renderFriendInfoModal()}
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderFriend()}</React.Fragment>;
};
/*
const mapStateToProps = state => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error
});
*/
const friendComponent = connect(null, {})(Friend);

export default friendComponent;
