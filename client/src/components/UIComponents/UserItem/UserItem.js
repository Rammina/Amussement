import "./UserItem.scss";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import CloseButton from "../../buttons/CloseButton";
import UserProfileCard from "../../UserProfileCard/UserProfileCard";

import { UserProfileCardContext } from "../../AppContext";

import {
  getAllDmRooms,
  removeActiveDmRoom,
  removeActiveDmRoomWithName,
} from "../../../flux/actions/dmRoomsActions";

const UserItem = (props) => {
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const location = useLocation();
  const { receiver } = queryString.parse(location.search);

  const getActiveClass = () =>
    receiver === props.user.username ? "active" : "";

  const userItemClickHandler = () => {
    setUserInfoModalOpen(true);
  };

  const renderUserInfoModal = () => {
    if (!userInfoModalOpen) return null;

    // get value  of UserProfileCardContext using this function
    const getUserProfileCardContextValue = () => {
      return { selectedUser: props.user };
    };

    return (
      <UserProfileCardContext.Provider value={getUserProfileCardContextValue()}>
        <UserProfileCard
          componentClass="user-item"
          onModalClose={() => {
            setUserInfoModalOpen(false);
          }}
        />
      </UserProfileCardContext.Provider>
    );
  };

  const renderCloseButton = () => {
    if (props.noCloseButton || !props.room) return null;

    const closeButtonOnClickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (props.room._id) props.removeActiveDmRoom(props.room._id);
      else if (props.room.name) {
        props.removeActiveDmRoomWithName(props.room.name);
      }
    };

    return (
      <CloseButton
        componentClass="user-item"
        onClickHandler={closeButtonOnClickHandler}
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        <ProfilePicture
          imageSrc={props.user.image_url || ""}
          componentClass={`sidebar`}
          // onClick={userOnClickHandler}
          // onContextMenu={userOnContextMenuHandler}
        />
        <span className="user-item-text">{props.user.username}</span>
        {renderCloseButton()}
      </>
    );
  };
  const renderComponent = () => {
    if (props.isLink) {
      return (
        <Link
          to={`/chat?room=DMto${props.user._id}&userType=user&roomType=DM&receiver=${props.user.username}`}
          className={`user-item-outer-container ${getActiveClass()}`}
        >
          {renderContent()}
        </Link>
      );
    } else {
      return (
        <>
          {renderUserInfoModal()}
          <div
            className="user-item-outer-container"
            onClick={userItemClickHandler}
          >
            {renderContent()}
          </div>
        </>
      );
    }
  };
  return renderComponent();
};

export default connect(null, {
  removeActiveDmRoom,
  removeActiveDmRoomWithName,
})(UserItem);
