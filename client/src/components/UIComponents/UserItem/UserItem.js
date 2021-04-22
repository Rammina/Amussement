import "./UserItem.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import CloseButton from "../../buttons/CloseButton";
import UserProfileCard from "../../UserProfileCard/UserProfileCard";
import UserContextMenu from "../../UserContextMenu/UserContextMenu";

import { UserProfileCardContext } from "../../AppContext";

import {
  // getAllDmRooms,
  addActiveDmRoom,
  removeActiveDmRoom,
  removeActiveDmRoomWithName,
} from "../../../flux/actions/dmRoomsActions";

import { updateCurrentRoom } from "../../../flux/actions/currentRoomActions";

import history from "../../../history";

const UserItem = (props) => {
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [showUserContextMenu, setShowUserContextMenu] = useState(false);
  const [isMouseHoveredOnContainer, setIsMouseHoveredOnContainer] = useState(
    false
  );
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [dmRoomName, setDmRoomName] = useState("");
  const location = useLocation();
  const { room } = queryString.parse(location.search);

  useEffect(() => {
    console.log(props.currentUser);
    if (props.currentUser) {
      setDmRoomName(
        `${[props.currentUser._id, props.user._id].sort().join("_")}DM`
      );
      setIsCurrentUser(props.currentUser._id === props.user._id);
    }
    /*return () => {}*/
  }, [props.currentUser]);

  const getActiveClass = () => (room === props.room.name ? "active" : "");

  const roomOpenOnClickHandler = () => {
    if (!props.currentRoom || props.currentRoom.name !== room) {
      props.updateCurrentRoom(props.room);
    }

    onCloseContextMenuHandler();
  };

  const onCloseContextMenuHandler = () => {
    setShowUserContextMenu(false);
  };

  const onMouseEnterContainerHandler = () => {
    setIsMouseHoveredOnContainer(true);
  };

  const onMouseLeaveContainerHandler = () => {
    setIsMouseHoveredOnContainer(false);
  };

  const userItemOnClickHandler = () => {
    setUserInfoModalOpen(true);
  };

  const userItemOnContextMenuHandler = (e) => {
    if (props.user.deleted) return null;
    e.preventDefault();
    e.stopPropagation();
    setShowUserContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  const profileOnClickHandler = () => {
    setUserInfoModalOpen(true);
    onCloseContextMenuHandler();
  };

  const sendMessageOnClickHandler = () => {
    let alreadyAddedToActive = false;
    for (let dmRoom of props.dmRooms) {
      if (dmRoom.name === dmRoomName) {
        alreadyAddedToActive = true;
      }
    }

    if (!alreadyAddedToActive) {
      props.addActiveDmRoom({
        // senderId: props.user._id,
        owner: null,
        receiver: props.user,
        receiverId: props.user._id,
        messages: [],
        members: [
          { user: props.currentUser, roles: ["member"] },
          { user: props.user, roles: ["member"] },
        ],
        image_url: "",
        name: dmRoomName,
        type: "DM",
        requires_approval: "false",
      });
    }

    roomOpenOnClickHandler();
    history.push(
      `/chat?room=${dmRoomName}&userType=user&roomType=DM&receiver=${props.user.username}`
    );
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

  const renderUserContextMenu = () => {
    if (!showUserContextMenu) return null;

    return (
      <UserContextMenu
        // note: think about how to make this recyclable
        isCurrentUser={isCurrentUser}
        clientX={clientX}
        clientY={clientY}
        selectedUser={props.user}
        friends={props.friends}
        onClose={onCloseContextMenuHandler}
        profileOnClick={profileOnClickHandler}
        sendMessageOnClick={sendMessageOnClickHandler}
      />
    );
  };

  const renderCloseButton = () => {
    if (props.noCloseButton || !props.room) return null;

    const closeButtonOnClickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const removeActiveDmRoomSuccessCb = () => {
        console.log(!room === props.room.name);
        if (!room === props.room.name) return null;

        // redirect to Home if inside DM that is being removed
        // note: this is very wrong because this is the targeted user not a current logged in user
        history.push(`/users/${props.currentUser._id}/home`);
      };

      if (props.room._id)
        props.removeActiveDmRoom(props.room._id, removeActiveDmRoomSuccessCb);
      else if (props.room.name) {
        props.removeActiveDmRoomWithName(
          props.room.name,
          removeActiveDmRoomSuccessCb
        );
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
    let item = props.isDmLink ? (
      <Link
        to={`/chat?room=${dmRoomName}&userType=user&roomType=DM&receiver=${props.user.username}`}
        className={`user-item-outer-container ${getActiveClass()}`}
        onContextMenu={userItemOnContextMenuHandler}
        onClick={roomOpenOnClickHandler}
      >
        {renderContent()}
      </Link>
    ) : (
      // it doesn't link to a direct message
      <div
        className="user-item-outer-container"
        onClick={userItemOnClickHandler}
        onContextMenu={userItemOnContextMenuHandler}
      >
        {renderContent()}
      </div>
    );
    return (
      <>
        {renderUserInfoModal()}
        {renderUserContextMenu()}
        {item}
      </>
    );
  };
  return renderComponent();
};

const mapStateToProps = (state) => ({
  currentUser: state.user.info,
  currentRoom: state.currentRoom,
  friends: state.friends,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  removeActiveDmRoom,
  removeActiveDmRoomWithName,
  addActiveDmRoom,
  updateCurrentRoom,
})(UserItem);
