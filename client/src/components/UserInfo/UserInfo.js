import "./UserInfo.scss";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import EditAccount from "../forms/userAccount/EditAccount";
import ChangeUserPassword from "../forms/userAccount/ChangeUserPassword";
import DisableAccount from "../forms/userAccount/DisableAccount";
import DeleteAccount from "../forms/userAccount/DeleteAccount";
import UserAvatar from "../UserAvatar/UserAvatar";
import BackButton from "../buttons/BackButton";

import { removeUserAvatar } from "../../flux/actions/settingsActions";
import { clearErrors } from "../../flux/actions/errorActions";

const UserInfo = (props) => {
  const [editAccountOpened, setEditAccountOpened] = useState(false);
  const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  const [disableAccountOpened, setDisableAccountOpened] = useState(false);
  const [deleteAccountOpened, setDeleteAccountOpened] = useState(false);

  //refs

  const getUsername = () => (props.user ? props.user.username : null);
  const getEmail = () => (props.user ? props.user.email : null);

  const renderDesktopHeading = () => {
    if (!props.isDesktopWidth) return null;
    return (
      <div className="my-account-section-heading-container desktop">
        <h1 className="my-account-section-heading desktop">My Account</h1>
      </div>
    );
  };

  const renderSection = () => {
    if (editAccountOpened) {
      return (
        <EditAccount
          initialValues={props.user}
          hideSection={() => {
            hideSection("EditAccount");
          }}
        />
      );
    } else if (changePasswordOpened) {
      return (
        <ChangeUserPassword
          hideSection={() => {
            hideSection("ChangeUserPassword");
          }}
        />
      );
    } else if (disableAccountOpened) {
      return (
        <DisableAccount
          hideSection={() => {
            hideSection("DisableAccount");
          }}
        />
      );
    } else if (deleteAccountOpened) {
      return (
        <DeleteAccount
          hideSection={() => {
            hideSection("DeleteAccount");
          }}
        />
      );
    }
    return null;
  };

  const hideSection = (sectionName) => {
    if (sectionName === "EditAccount" || sectionName === "edit-account") {
      setEditAccountOpened(false);
    } else if (
      sectionName === "ChangeUserPassword" ||
      sectionName === "change-user-password"
    ) {
      setChangePasswordOpened(false);
    } else if (
      sectionName === "DisableAccount" ||
      sectionName === "disable-account"
    ) {
      setDisableAccountOpened(false);
    } else if (
      sectionName === "DeleteAccount" ||
      sectionName === "delete-account"
    ) {
      setDeleteAccountOpened(false);
    }
    // clear errors when closing a modal
    props.clearErrors();
  };

  const renderAccountManagement = () => {
    if (!props.isDesktopWidth || !props.isDesktopHeight) {
      return (
        <ul className="account-management-items">
          <button
            className="account-management-button"
            onClick={() => {
              setDisableAccountOpened(true);
            }}
          >
            <li className={`account-management-item`}>Disable Account</li>
          </button>
          <button
            className="account-management-button"
            onClick={() => {
              setDeleteAccountOpened(true);
            }}
          >
            <li
              id="delete-account-button-item"
              className={`account-management-item`}
            >
              Delete Account
            </li>
          </button>
        </ul>
      );
    }
    return (
      <div className="account-management two-buttons-container">
        <button
          className="account-management-button"
          onClick={() => {
            setDisableAccountOpened(true);
          }}
        >
          Disable Account
        </button>
        <button
          id="delete-account-button"
          className="account-management-button transparent-bg danger"
          onClick={() => {
            setDeleteAccountOpened(true);
          }}
        >
          Delete Account
        </button>
      </div>
    );
  };

  // render
  return (
    props.user && (
      <div className="settings-page-content-container">
        {renderDesktopHeading()}
        {renderSection()}

        <div className="my-account-section-container profile-outer-container">
          <div className="settings-page-content-header">
            <BackButton
              componentClass="my-account"
              buttonId="my-account-back-button"
              hideOnDesktop={true}
              onClickHandler={props.closeMyAccount}
            />

            <h1
              id="my-account-section-heading"
              className="settings-page-content-header-heading"
            >
              My Account
            </h1>
          </div>
          <div className="profile-container">
            <UserAvatar />

            <div className="" id="profile-information-container">
              <label className="profile-information label">USERNAME</label>
              <p className="profile-information" id="profile-username">
                {getUsername()}
              </p>
              <label className="profile-information label">EMAIL</label>

              <p className="profile-information" id="profile-email">
                {getEmail()}
              </p>
              <button
                className="profile-information user-avatar-remove hide-750w"
                onClick={() => {
                  props.removeUserAvatar();
                }}
              >
                Remove Image
              </button>
            </div>
          </div>

          <div className="two-buttons-container" id="profile-buttons-container">
            <button
              className="profile-button"
              id="profile-edit-button"
              onClick={() => {
                setEditAccountOpened(true);
              }}
            >
              Edit Account
            </button>

            <button
              className="profile-button"
              id="profile-change-password-button"
              onClick={() => {
                setChangePasswordOpened(true);
              }}
            >
              Change Password
            </button>
          </div>
        </div>

        <div
          id="account-management-section-container"
          className="my-account-section-container white-border-top mt-1-r"
        >
          <h2 className="section-heading my-account">Account Management</h2>
          {renderAccountManagement()}
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
});

const userInfo = connect(mapStateToProps, { removeUserAvatar, clearErrors })(
  UserInfo
);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
