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

import { WindowContext } from "../AppContext";

const UserProfileCard = (props) => {
  const [modalHeight, setModalHeight] = useState(0);
  const [selectedSection, setSelectedSection] = useState("userInfo");
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const modalElement = useRef(null);

  useEffect(() => {
    if (modalElement) setModalHeight(modalElement.current.clientHeight);
  }, []);

  // note:this is a mobile version of the profile card
  const renderMobileContent = () => (
    <React.Fragment>
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
              <UserIdentity selectedUser={props.selectedUser} />
              <UserCommunications selectedUser={props.selectedUser} />
            </section>
            <section className="user-profile-card-section-container">
              <UserConnections />
              <Notes />
            </section>
          </div>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );

  const renderDesktopContent = () => {
    const renderSelectedSection = () => {
      switch (selectedSection) {
        case "userInfo":
          return <Notes />;
          break;
        case "mutualFriends":
          return <div></div>;
          break;
        case "mutualServers":
          return <div></div>;
          break;
        default:
          return null;
      }
    };
    // class names for the buttons
    const getUserInfoButtonClass = () =>
      selectedSection === "userInfo" ? "selected" : null;
    const getMutualFriendsButtonClass = () =>
      selectedSection === "mutualFriends" ? "selected" : null;
    const getMutualServersButtonClass = () =>
      selectedSection === "mutualServers" ? "selected" : null;
    // render desktop content
    return (
      <React.Fragment>
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
                <UserIdentity selectedUser={props.selectedUser} />
              </section>
              <section className="user-profile-card-section-container buttons-container">
                <button
                  className={`user-profile-card-button ${getUserInfoButtonClass()}`}
                  onClick={() => {}}
                >
                  User Info
                </button>
                <button
                  className={`user-profile-card-button ${getMutualFriendsButtonClass()}`}
                  onClick={() => {}}
                >
                  Mutual Friends
                </button>
                <button
                  className={`user-profile-card-button ${getMutualServersButtonClass()}`}
                  onClick={() => {}}
                >
                  Mutual Servers
                </button>
              </section>
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
});

export default connect(mapStateToProps, {
  // removeFriend,
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
