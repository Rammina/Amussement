import "./UserProfileCard.scss";

import React, { useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Modal from "../Modal/Modal";
import UserIdentity from "./UserIdentity/UserIdentity";
import UserCommunications from "./UserCommunications/UserCommunications";
import UserConnections from "./UserConnections/UserConnections";
import Notes from "./Notes/Notes";
import RemoveFriendModal from "../forms/friend/RemoveFriendModal";
import UserContextMenu from "../UserContextMenu/UserContextMenu";

import { addFriendWithId } from "../../flux/actions/friendsActions";
import { addActiveDmRoom } from "../../flux/actions/dmRoomsActions";
import { getFriendStatusWithUser } from "../../helpers";

import { WindowContext, UserProfileCardContext } from "../AppContext";

const UserProfileCard = (props) => {
  const [clientX, setClientX] = useState(-200);
  const [clientY, setClientY] = useState(-200);
  const [showUserContextMenu, setShowUserContextMenu] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [connectionToUser, setConnectionToUser] = useState(null);
  const [modalHeight, setModalHeight] = useState(0);
  const [selectedSection, setSelectedSection] = useState("userInfo");
  const [removeFriendModalOpen, setRemoveFriendModalOpen] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const { selectedUser, friendStatus } = useContext(UserProfileCardContext);
  const modalElement = useRef(null);

  const [dmRoomName, setDmRoomName] = useState("");
  useEffect(() => {
    console.log(props.user);
    if (props.user)
      setDmRoomName(`${[props.user._id, selectedUser._id].sort().join("_")}DM`);
  }, [props.user]);

  const checkIfUserIsSelf = () => {
    if (selectedUser._id === props.user._id) setIsCurrentUser(true);
  };

  const checkConnectionToUser = () => {
    if (friendStatus) {
      setConnectionToUser(friendStatus);
      return friendStatus;
    }
    setConnectionToUser(
      getFriendStatusWithUser(selectedUser._id, props.friends)
    );

    for (let friend of props.friends) {
      if (friend._id === selectedUser._id) {
        //found a user with the same ID
        setConnectionToUser(friend.status);
        return friend.status;
      }
    }
    setConnectionToUser(null);

    // note: maybe check if user is blocked once the function is implemented
  };

  // probably needs to be checked only once
  useEffect(() => {
    checkConnectionToUser();
  }, []);

  useEffect(() => {
    checkIfUserIsSelf();
    // check the height again because some elements are not rendered with own profile
    if (modalElement) setModalHeight(modalElement.current.clientHeight);
  }, [isCurrentUser]);

  const addFriendHandler = () => {
    // do not send a friend request if already accepted, requested, or pending
    if (friendStatus) return null;
    // add friend and change the status state to cause rerender
    props.addFriendWithId(selectedUser._id);
    setConnectionToUser("requested");
  };

  const ellipsisOnClickHandler = (e) => {
    console.log("showing user context menu");
    e.preventDefault();
    e.stopPropagation();

    setShowUserContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  const onCloseContextMenuHandler = () => {
    setShowUserContextMenu(false);
  };

  const sendMessageOnClickHandler = () => {
    let alreadyAddedToActive = false;
    let roomName = `${[props.user._id, selectedUser._id].sort().join("_")}DM`;

    for (let dmRoom of props.dmRooms) {
      if (dmRoom.name === roomName) {
        alreadyAddedToActive = true;
      }
    }

    if (!alreadyAddedToActive) {
      props.addActiveDmRoom({
        // senderId: props.user._id,
        owner: null,
        receiver: selectedUser,
        receiverId: selectedUser._id,
        messages: [],
        members: [
          { user: props.user, roles: ["member"] },
          { user: selectedUser, roles: ["member"] },
        ],
        image_url: "",
        name: roomName,
        type: "DM",
        requires_approval: "false",
      });
    }
  };

  const openRemoveFriendModalHandler = () => {
    setRemoveFriendModalOpen(true);
  };

  const closeRemoveFriendModalHandler = () => {
    setRemoveFriendModalOpen(false);
  };

  // render functions
  const renderUserContextMenu = () => {
    if (!showUserContextMenu) return null;

    return (
      <UserContextMenu
        isCurrentUser={false}
        clientX={clientX}
        clientY={clientY}
        selectedUser={selectedUser}
        friends={props.friends}
        noProfileButton={true}
        onClose={onCloseContextMenuHandler}
        sendMessageOnClick={sendMessageOnClickHandler}
      />
    );
  };

  const renderRemoveFriendModal = () => {
    if (!removeFriendModalOpen) return null;
    return (
      <RemoveFriendModal
        selectedUser={selectedUser}
        connectionToUser={connectionToUser}
        setConnectionToUser={setConnectionToUser}
        onModalClose={closeRemoveFriendModalHandler}
      />
    );
  };

  const renderUserCommunications = () =>
    !isCurrentUser ? (
      <UserCommunications
        connectionToUser={connectionToUser}
        addFriend={addFriendHandler}
        openRemoveFriend={openRemoveFriendModalHandler}
        sendMessageOnClickHandler={sendMessageOnClickHandler}
        dmRoomName={dmRoomName}
      />
    ) : null;

  const renderPopupContent = () => (
    <>
      {renderUserContextMenu()}
      {renderRemoveFriendModal()}
    </>
  );

  // note:this is a mobile version of the profile card
  const renderMobileContent = () => (
    <React.Fragment>
      {renderPopupContent()}
      <Modal
        componentClass={`user-profile-card ${props.componentClass}`}
        noHeader={true}
        isSlideUp={true}
        onModalClose={props.onModalClose}
        // should translate based on how tall the Modal is
        modalStyle={{
          transform: `translateY(100vh) translateY(-${modalHeight}px)`,
        }}
      >
        <React.Fragment>
          <div className="user-profile-card-outer-container" ref={modalElement}>
            <section className="user-profile-card-section-container">
              <UserIdentity
                isCurrentUser={isCurrentUser}
                dmRoomName={dmRoomName}
                ellipsisOnClickHandler={ellipsisOnClickHandler}
              />
              {renderUserCommunications()}
            </section>
            <section className="user-profile-card-section-container">
              <Notes />
            </section>
          </div>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );

  const renderDesktopContent = () => {
    const renderSelectedSection = () => {
      let sectionContent = null;
      switch (selectedSection) {
        case "userInfo":
          sectionContent = <Notes />;
          break;
        case "mutualFriends":
          sectionContent = <div></div>;
          break;
        case "mutualServers":
          sectionContent = <div></div>;
          break;
      }
      return (
        <div
          id="selected-section-container"
          className="user-profile-card-section-container"
        >
          {sectionContent}
        </div>
      );
    };
    // class names for the buttons
    const getUserInfoButtonClass = () =>
      selectedSection === "userInfo" ? "selected" : null;

    const renderSectionSelectorButtons = () =>
      !isCurrentUser ? (
        <section className="user-profile-card-section-container buttons-container">
          <button
            className={`user-profile-card-button ${getUserInfoButtonClass()}`}
            onClick={() => {
              setSelectedSection("userInfo");
            }}
          >
            User Info
          </button>
        </section>
      ) : null;

    // render desktop content
    return (
      <React.Fragment>
        {renderPopupContent()}
        <Modal
          componentClass={`user-profile-card ${props.componentClass}`}
          noHeader={true}
          noFooter={true}
          onModalClose={props.onModalClose}
        >
          <React.Fragment>
            <div
              className="user-profile-card-outer-container"
              ref={modalElement}
            >
              <section className="user-profile-card-section-container">
                <UserIdentity
                  isCurrentUser={isCurrentUser}
                  connectionToUser={connectionToUser}
                  addFriend={addFriendHandler}
                  sendMessageOnClickHandler={sendMessageOnClickHandler}
                  ellipsisOnClickHandler={ellipsisOnClickHandler}
                  dmRoomName={dmRoomName}
                />
              </section>
              {renderSectionSelectorButtons()}
              {renderSelectedSection()}
            </div>
          </React.Fragment>
        </Modal>
      </React.Fragment>
    );
  };

  const content =
    isDesktopWidth && isDesktopHeight
      ? renderDesktopContent()
      : renderMobileContent();
  // render using portal
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  friends: state.friends,
  dmRooms: state.dmRooms,
});

export default connect(mapStateToProps, {
  // removeFriend,
  addFriendWithId,
  addActiveDmRoom,
})(UserProfileCard);

// note: there are no servers right now so just going to put this away
/*
  <button
    className={`user-profile-card-button ${getMutualFriendsButtonClass()}`}
    onClick={() => {
      setSelectedSection("mutualFriends");
    }}
  >
    Mutual Friends
  </button>
  <button
    className={`user-profile-card-button ${getMutualServersButtonClass()}`}
    onClick={() => {
      setSelectedSection("mutualServers");
    }}
  >
    Mutual Servers
  </button>
  */

//note: there are no servers but this was above notes section on mobile
// {renderUserConnections()}
