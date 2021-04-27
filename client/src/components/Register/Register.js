import "./Register.scss";

import React from "react";

import RegisterForm from "../forms/auth/RegisterForm";

const Register = () => {
  return (
    <div className="register page-container">
      <h1 className="heading-title">Amussement</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
