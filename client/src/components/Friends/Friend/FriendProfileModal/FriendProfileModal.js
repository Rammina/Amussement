import EllipsisImg from "../../../../icons/ellipsis.png";

import React, { useState } from "react";
import { Route, Link } from "react-router-dom";

// import serverRest from "../../apis/serverRest";

import { connect } from "react-redux";

import { removeFriend } from "../../../../flux/actions/friendsActions";
import Modal from "../../../Modal/Modal";

import "./FriendProfileModal.scss";

const FriendProfileModal = (props) => {
  console.log(props.getFriendInfoModalClass());
  return (
    <React.Fragment>
      <Modal
        componentClass="friend-profile"
        noHeader={true}
        isSlideUp={true}
        onModalClose={props.onModalClose}
        modalStyle={{ transform: "translateY(100vh) translateY(-30rem)" }}
        modalContent={
          <React.Fragment>
            <div className="friend-profile-outer-container">
              <section className="friend-profile-section-container">
                <section className="friend-profile-section-sub-container">
                  {props.renderAvatar("friend-profile")}

                  <h3 id="friend-profile-username">{props.friend.username}</h3>
                  <button id="friend-ellipsis-button">
                    <img
                      className={`ellipsis-icon-img`}
                      src={EllipsisImg}
                      alt="Ellipsis icon"
                    />
                  </button>
                </section>

                <section
                  className="friend-profile-section-sub-container"
                  id="friend-communication-buttons-container"
                >
                  <button
                    className="friend-communication-button"
                    onClick={() => {}}
                  >
                    Message
                  </button>
                  <button
                    className="friend-communication-button"
                    onClick={() => {}}
                  >
                    Call
                  </button>
                  <button
                    className="friend-communication-button"
                    onClick={() => {}}
                  >
                    Video
                  </button>
                </section>
              </section>
              <section className="friend-profile-section-container">
                <section className="friend-profile-section-sub-container">
                  <h4 className="friend-profile-section-header">Connections</h4>
                  <div className="friend-profile-mutual-button-container">
                    <button className="friend-profile-mutual-button">
                      <span>Mutual Servers</span>
                      {/*change this to an image with the right arrow*/}
                      <span>{">"}</span>
                    </button>
                    <button className="friend-profile-mutual-button">
                      <span>Mutual Friends</span>
                      <span>{">"}</span>
                    </button>
                  </div>
                </section>
                <section className="friend-profile-section-sub-container">
                  <h4 className="friend-profile-section-header">Note</h4>
                  <form className="friend-profile-notes-form">
                    <textarea
                      className="friend-profile-notes-textarea"
                      placeholder="Tap/click to add a note"
                    ></textarea>
                  </form>
                </section>
              </section>
            </div>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {
  removeFriend,
})(FriendProfileModal);

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
      className={`friend-profile-outer-container modal slide-up ${props.getFriendInfoModalClass()}`}
      //note: should have a dynamic state-based value for this depending on how tall the element is
      style={{ transform: "translateY(100vh) translateY(-20rem)" }}
    >
      <h3 className="friend-profile modal-heading">
        {props.friend.username}
      </h3>
      {props.renderAvatar()}
    </div>
  </>
);
*/
