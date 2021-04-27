import "./LeaveRoom.scss";

import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { leaveRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const LeaveRoom = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.actionShowLoader("leaveRoomForm", true);
    props.leaveRoom(props.room._id, props.redirectToHomeUponRemovalCb);
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
        componentClass="leave-room"
        onModalClose={() => {
          console.log("closing leave-room modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Leave Room"
        autoFocusOnCancel={true}
        actionButtons={
          <button
            id="leave-room-submit"
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={onSubmitHandler}
          >
            {renderLoader()} Leave Room
          </button>
        }
      >
        <form
          id="leave-room-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="leave-room form-content-container modal-form-content">
            <p className="modal-paragraph leave-room">
              Are you sure you want to leave this room?
            </p>
            <p className="modal-paragraph leave-room enlarged-text centered">
              {props.room.name}
            </p>

            {renderErrorNotifications()}
          </div>
          <button
            type="submit"
            onClick={onSubmitHandler}
            style={{ display: "none" }}
          >
            Leave Room
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
  showLoader: state.loader.showLeaveRoomFormLoader,
});

export default connect(mapStateToProps, {
  leaveRoom,
  actionShowLoader,
})(LeaveRoom);

{
  /* <p
  id="leave-room-description-paragraph"
  className="modal-paragraph small-text leave-room"
>
  Warning: Deleted rooms cannot be restored.
</p>; */
}

// // submit handler
// const onSubmit = async (formValues) => {
//   console.log(formValues);
//   props.actionShowLoader("leaveRoomForm", true);
//   await props.leaveRoom(formValues);
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
