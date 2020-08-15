// import DoorImg from "../../icons/door.png";

import "./UserAccount.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

// import { renderError, getErrorClass } from "../../helpers";

const UserAccount = props => {
  return (
    <div className="user-account-page-container">
      <div className="user-account-outer-flex-container">
        <div className="user-account-sidebar-outer-container"></div>
        <div className="user-account-content-container">
          <div className="user-account-section-container"></div>
          <div className="user-account-section-container"></div>
        </div>

        <button className="" id="user-account-close-button">
          x
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
