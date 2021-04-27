import "./Friend.scss";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { connect } from "react-redux";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import AcceptFriend from "./AcceptFriend/AcceptFriend";
import RemoveFriend from "./RemoveFriend/RemoveFriend";
import RemoveFriendModal from "../../forms/friend/RemoveFriendModal";

import DirectMessage from "./DirectMessage/DirectMessage";
import UserProfileCard from "../../UserProfileCard/UserProfileCard";
import UserContextMenu from "../../UserContextMenu/UserContextMenu";
import { UserProfileCardContext } from "../../AppContext";

import { addActiveDmRoom } from "../../../flux/actions/dmRoomsActions";
import history from "../../../history";

const Friend = (props) => {
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [showUserContextMenu, setShowUserContextMenu] = useState(false);

  const [friendInfoModalOpen, setFriendInfoModalOpen] = useState(false);
  const [removeFriendModalOpen, setRemoveFriendModalOpen] = useState(false);
  const [dmRoomName, setDmRoomName] = useState("");

  useEffect(() => {
    if (props.user) {
      setDmRoomName(`${[props.user._id, friend._id].sort().join("_")}DM`);
    }
  }, [props.user]);

  useEffect(() => {
    console.log(props.friend);
  }, []);

  // friend variables from props
  const { friend, status } = props.friend;
  console.log(props.friend);
  console.log(friend);

  // get value  of UserProfileCardContext using this function
  const getUserProfileCardContextValue = () => {
    return { selectedUser: friend, friendStatus: status };
  };

  const onCloseContextMenuHandler = () => {
    setShowUserContextMenu(false);
  };

  const profileOnClickHandler = () => {
    setFriendInfoModalOpen(true);
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
        owner: null,
        receiver: friend,
        receiverId: friend._id,
        messages: [],
        members: [
          { user: props.user, roles: ["member"] },
          { user: props.friend, roles: ["member"] },
        ],
        image_url: "",
        name: dmRoomName,
        type: "DM",
        requires_approval: "false",
      });
    }
    history.push(
      `/chat?room=${dmRoomName}&userType=user&roomType=DM&receiver=${friend.username}`
    );
  };

  const userItemOnClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFriendInfoModalOpen(true);
  };

  const userItemOnContextMenuHandler = (e) => {
    if (props.user.deleted) return null;
    e.preventDefault();
    e.stopPropagation();
    setShowUserContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  const openRemoveFriendModalHandler = () => {
    setRemoveFriendModalOpen(true);
  };

  const closeRemoveFriendModalHandler = () => {
    setRemoveFriendModalOpen(false);
  };

  const renderRemoveFriendModal = () => {
    if (!removeFriendModalOpen) return null;
    return (
      <RemoveFriendModal
        selectedUser={friend}
        connectionToUser={status}
        onModalClose={closeRemoveFriendModalHandler}
      />
    );
  };

  const renderUserContextMenu = () => {
    if (!showUserContextMenu) return null;

    return (
      <UserContextMenu
        selectedUser={friend}
        isCurrentUser={false}
        clientX={clientX}
        clientY={clientY}
        userId={friend._id}
        friendStatus={status}
        friends={props.friends}
        onClose={onCloseContextMenuHandler}
        profileOnClick={profileOnClickHandler}
        sendMessageOnClick={sendMessageOnClickHandler}
      />
    );
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
            <RemoveFriend
              friend={friend}
              text="Cancel"
              status={status}
              onClickHandler={openRemoveFriendModalHandler}
            />
          </>
        );
      } else if (status === "pending") {
        return (
          <>
            <AcceptFriend friend={friend} />
            <RemoveFriend
              friend={friend}
              text="Reject"
              onClickHandler={openRemoveFriendModalHandler}
            />
          </>
        );
      } else if (status === "accepted") {
        return (
          <>
            {/*note:this should lead to a direct message instance/component*/}
            <DirectMessage
              user={props.user}
              friend={friend}
              sendMessageOnClickHandler={sendMessageOnClickHandler}
            />
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
        {renderUserContextMenu()}
        {renderFriendInfoModal()}
        {renderRemoveFriendModal()}
        <div
          className="friend-item-container"
          onClick={userItemOnClickHandler}
          onContextMenu={userItemOnContextMenuHandler}
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
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderFriend()}</React.Fragment>;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  friends: state.friends,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  addActiveDmRoom,
})(Friend);
