import "./AddFriend.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { addFriendWithUsername } from "../../flux/actions/friendsActions";
import {
  renderError,
  getErrorClass,
  arrayHasObjectWithPropAndValue
} from "../../helpers";

import ErrorNotifications from "../ErrorNotifications/ErrorNotifications";

import history from "../../history";

const onInput = e => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = e => {
  // This prevents submission bugging or refreshing upon pressing enter
  // in an input field inside a form
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
  }
};

const renderInput = ({ input, meta, inputProps, labelProps }) => {
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.class || null;
  const labelId = labelProps.id || null;
  return (
    <React.Fragment>
      <label
        htmlFor={inputProps.id}
        className={`${errorClass} ${labelClass}`}
        id={labelId || ""}
      >
        {labelProps.text}
      </label>
      <input
        {...inputProps}
        {...input}
        className={`${inputProps.className} ${errorClass}`}
        onKeyDown={e => {
          handleEnterKeyOnField(e);
        }}
        onInput={e => {
          onInput(e);
        }}
        autoFocus={inputProps.autoFocus || false}
      />
      {renderError(meta, "add-friend")}
    </React.Fragment>
  );
};

const AddFriend = props => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  console.log(props.friends);
  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };
  // submit handler
  const onSubmit = async formValues => {
    console.log(formValues);
    // run an action
    await props.addFriendWithUsername(formValues);
  };

  return (
    <React.Fragment>
      <div className="modal add-friend">
        <form id="add-friend-form" autoComplete="off">
          <div className="add-friend form-content-container">
            <div className="heading-container">
              <h2 className="heading">Add Friend</h2>
            </div>
            {renderErrorNotifications()}
            <div className="textfield-container">
              <Field
                name="username"
                component={renderInput}
                type="text"
                props={{
                  inputProps: {
                    placeholder: "Enter a Username",
                    className: "textfield",
                    maxLength: "30",
                    autoComplete: "off",
                    id: "add-friend-username-field",
                    type: "text"
                    // autoFocus: true
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Friend Username",
                    id: "add-friend-username-label"
                  }
                }}
              />
            </div>

            <div className="form-button-container">
              <button
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Send Friend Request
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="backdrop" id="add-friend-modal-backdrop"></div>
    </React.Fragment>
  );
};

const validate = formValues => {
  console.log(formValues);

  const errors = {};
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  /*
  // best to do this in thebackend
  if (props && props.friends) {
    if (
      arrayHasObjectWithPropAndValue(
        props.friends,
        "username",
        formValues.username
      )
    ) {
      errors.username = "This user is already in your friend list";
    }
  }
*/
  return errors;
};

const mapStateToProps = state => ({
  friends: state.friends,
  error: state.error
});

const addFriendComponent = connect(
  mapStateToProps,
  {
    addFriendWithUsername
  }
)(AddFriend);

export default reduxForm({
  form: "addFriend",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(addFriendComponent);
