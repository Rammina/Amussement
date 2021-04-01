import "./UserProfileCard.scss";

import React, { useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

// import { removeFriend } from "../../../../flux/actions/friendsActions";
import Modal from "../Modal/Modal";
import UserIdentity from "./UserIdentity/UserIdentity";
import UserCommunications from "./UserCommunications/UserCommunications";
import UserConnections from "./UserConnections/UserConnections";
import Notes from "./Notes/Notes";
import RemoveFriendModal from "../forms/friend/RemoveFriendModal";

import { addFriendWithId } from "../../flux/actions/friendsActions";
import { addActiveDmRoom } from "../../flux/actions/dmRoomsActions";
import { isFriendsWithUser, getFriendStatusWithUser } from "../../helpers";

import { WindowContext, UserProfileCardContext } from "../AppContext";

const UserProfileCard = (props) => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [connectionToUser, setConnectionToUser] = useState(null);
  const [modalHeight, setModalHeight] = useState(0);
  const [selectedSection, setSelectedSection] = useState("userInfo");
  const [removeFriendModalOpen, setRemoveFriendModalOpen] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const { selectedUser, friendStatus } = useContext(UserProfileCardContext);
  const modalElement = useRef(null);

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
      />
    ) : null;

  const renderUserConnections = () =>
    !isCurrentUser ? <UserConnections /> : null;

  // note:this is a mobile version of the profile card
  const renderMobileContent = () => (
    <React.Fragment>
      {renderRemoveFriendModal()}
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
              <UserIdentity isCurrentUser={isCurrentUser} />
              {renderUserCommunications()}
            </section>
            <section className="user-profile-card-section-container">
              {renderUserConnections()}
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
    const getMutualFriendsButtonClass = () =>
      selectedSection === "mutualFriends" ? "selected" : null;
    const getMutualServersButtonClass = () =>
      selectedSection === "mutualServers" ? "selected" : null;

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
        </section>
      ) : null;

    // render desktop content
    return (
      <React.Fragment>
        {renderRemoveFriendModal()}
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

/*
return (
  <>
    <div
      // className={`backdrop ${getModalOpenClass()} ${getClassName()}`}
      className={`backdrop ${props.getFriendInfoModalClass()}`}
      onClick={() => {
        // props.onModalClose();
      }}
    ></div>
    <div
      className={`user-profile-card-outer-container modal slide-up ${props.getFriendInfoModalClass()}`}
      //note: should have a dynamic state-based value for this depending on how tall the element is
      style={{ transform: "translateY(100vh) translateY(-20rem)" }}
    >
      <h3 className="user-profile-card modal-heading">
        {props.friend.username}
      </h3>
      {props.renderAvatar()}
    </div>
  </>
);
*/
