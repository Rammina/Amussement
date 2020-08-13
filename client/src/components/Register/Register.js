import DoorImg from "../../icons/door.png";

import "./Register.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import RegisterForm from "../forms/RegisterForm";

import { renderError, getErrorClass } from "../../helpers";

const Register = () => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <h1 className="heading-title">Amussement</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
