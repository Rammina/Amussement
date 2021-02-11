import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

// import { removeFriend } from "../../../../flux/actions/friendsActions";
import Modal from "../Modal/Modal";
import UserIdentity from "./UserIdentity/UserIdentity";
import UserCommunications from "./UserCommunications/UserCommunications";
import UserConnections from "./UserConnections/UserConnections";
import Notes from "./Notes/Notes";

import "./UserProfileCard.scss";

const UserProfileCard = (props) => {
  const [modalHeight, setModalHeight] = useState(0);
  const modalElement = useRef(null);

  useEffect(() => {
    if (modalElement) setModalHeight(modalElement.current.clientHeight);
  }, []);

  const content = (
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
