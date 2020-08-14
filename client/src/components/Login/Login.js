import DoorImg from "../../icons/door.png";

import "./Login.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import LoginForm from "../forms/LoginForm";

import { renderError, getErrorClass } from "../../helpers";

const Login = () => {
  return (
    <div className="login page-container">
      <h1 className="heading-title">Amussement</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
