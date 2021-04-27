import "./Login.scss";

import React from "react";

import LoginForm from "../forms/auth/LoginForm";

const Login = () => {
  return (
    <div className="login page-container">
      <h1 className="heading-title">Amussement</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
