import "./RemoveFriendModal.scss";

import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { removeFriend } from "../../../flux/actions/friendsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const RemoveFriendModal = (props) => {
  const { connectionToUser } = props;

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner className="white" showLoader={props.showLoader} />;
  };

  const renderHeadingText = () => {
    switch (connectionToUser) {
      case "accepted":
        return "Remove Friend";

      case "requested":
        return "Cancel Friend Request";

      case "pending":
        return "Decline Friend Request";

      default:
        return "Remove Friend";
    }
  };

  const renderButtonText = () => {
    switch (connectionToUser) {
      case "accepted":
        return "Remove Friend";

      case "requested":
        return "Cancel Friend Request";

      case "pending":
        return "Decline Friend Request";

      default:
        return "Remove Friend";
    }
  };

  const renderParagraphText = () => {
    switch (connectionToUser) {
      case "accepted":
        return "Would you like to remove this user from your friend list?";

      case "requested":
        return "Would you like to cancel your friend request for this user?";

      case "pending":
        return "Would you like to decline this user's friend request?";

      default:
        return "Would you like to remove this user from your friend list?";
    }
  };

  // submit handler
  const onSubmit = async () => {
    const removeFriendSuccessCb = () => {
      // check against undefined errors
      if (props.setConnectionToUser) {
        props.setConnectionToUser(null);
      }
      props.onModalClose();
    };

    props.actionShowLoader("removeFriendModal", true);
    await props.removeFriend(props.selectedUser._id, removeFriendSuccessCb);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="remove-friend"
        onModalClose={() => {
          console.log("closing remove-friend modal");
          props.onModalClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText={renderHeadingText()}
        actionButtons={
          <button
            id="remove-friend-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={onSubmit}
          >
            {renderLoader()} {renderButtonText()}
          </button>
        }
      >
        <div className="remove-friend form-content-container modal-form-content">
          <p className="modal-paragraph remove-friend">
            {renderParagraphText()}
          </p>
          <p
            id="remove-friend-description-paragraph"
            className="modal-paragraph enlarged-text centered remove-friend"
          >
            {props.selectedUser.username}
          </p>

          {renderErrorNotifications()}
        </div>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showRemoveFriendModalLoader,
});

export default connect(mapStateToProps, {
  removeFriend,
  actionShowLoader,
})(RemoveFriendModal);
