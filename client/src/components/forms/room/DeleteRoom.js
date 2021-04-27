import "./DeleteRoom.scss";

import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { deleteRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const DeleteRoom = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.actionShowLoader("deleteRoomForm", true);
    props.deleteRoom(props.room._id, props.redirectToHomeUponRemovalCb);
  };

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

  const content = (
    <React.Fragment>
      <Modal
        componentClass="delete-room"
        onModalClose={() => {
          console.log("closing delete-room modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Delete Room"
        autoFocusOnCancel={true}
        actionButtons={
          <button
            id="delete-room-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={onSubmitHandler}
          >
            {renderLoader()} Delete Room
          </button>
        }
      >
        <form
          id="delete-room-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="delete-room form-content-container modal-form-content">
            <p className="modal-paragraph delete-room">
              Are you sure you want to delete this room?
            </p>
            <p className="modal-paragraph delete-room enlarged-text centered">
              {props.room.name}
            </p>
            <p
              id="delete-room-description-paragraph"
              className="modal-paragraph small-text delete-room"
            >
              Warning: Deleted rooms cannot be restored.
            </p>

            {renderErrorNotifications()}
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            style={{ display: "none" }}
          >
            Delete Room
          </button>
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
  showLoader: state.loader.showDeleteRoomFormLoader,
});

export default connect(mapStateToProps, {
  deleteRoom,
  actionShowLoader,
})(DeleteRoom);

// // submit handler
// const onSubmit = async (formValues) => {
//   console.log(formValues);
//   props.actionShowLoader("deleteRoomForm", true);
//   await props.deleteRoom(formValues);
// };

// const validate = (formValues) => {
//   console.log(formValues);
//   const errors = {};
//   return errors;
// };

// export default reduxForm({
//   form: "deleteAccount",
//   keepDirtyOnReinitialize: true,
//   enableReinitialize: true,
//   validate,
// })(deleteAccount);
