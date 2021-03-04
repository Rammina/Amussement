import "./RemoveFriend.scss";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import serverRest from "../../../apis/serverRest";

import { connect } from "react-redux";

import { removeFriend } from "../../../flux/actions/friendsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";
import CancelButton from "../../buttons/CancelButton";
import LoadingSpinner from "../../loaders/LoadingSpinner";

import history from "../../../history";

const RemoveFriend = (props) => {
  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner showLoader={props.showLoader} />;
  };

  // submit handler
  const onSubmit = async () => {
    props.actionShowLoader("removeFriend", true);
    await props.removeFriend(props.selectedUserId);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="remove-friend"
        onModalClose={() => {
          console.log("closing remove-friend modal");
          props.hideSection();
        }}
        headerClassName="user-settings-sidebar-header"
        headingText="Delete Account"
        actionButtons={
          <button
            id="remove-friend-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Delete Account
          </button>
        }
      >
        <form id="remove-friend-form" autoComplete="off">
          <div className="remove-friend form-content-container modal-form-content">
            <p className="modal-paragraph remove-friend">
              Are you sure you want to delete your account?
            </p>
            <p
              id="remove-friend-description-paragraph"
              className="modal-paragraph small-text remove-friend"
            >
              Warning: Deleted accounts cannot be restored.
            </p>

            {renderErrorNotifications()}

            <div
              className="textfield-container"
              id="remove-friend-password-container"
            ></div>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showLoader: state.loader.showRemoveFriendFormLoader,
});

export default connect(mapStateToProps, {
  removeFriend,
  actionShowLoader,
})(RemoveFriend);
