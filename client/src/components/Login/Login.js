import "./Login.scss";

import React from "react";

import LoginForm from "../forms/auth/LoginForm";

const Login = () => {
  return (
    <div className="login page-container">
      <h1 className="heading-title">Amussement</h1>
      <hr className="auth hr" />
      <h2 className="heading-subtitle">Online Chat App</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
