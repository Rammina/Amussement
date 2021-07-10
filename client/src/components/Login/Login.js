import "./Login.scss";

import React from "react";

import LoginForm from "../forms/auth/LoginForm";

const Login = () => {
  return (
    <main className="login page-container">
      <svg
        className="auth wave-page-background"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#b8ffca"
          fill-opacity="1"
          d="M0,256L60,213.3C120,171,240,85,360,58.7C480,32,600,64,720,101.3C840,139,960,181,1080,165.3C1200,149,1320,75,1380,37.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>{" "}
      <h1 className="heading-title">Amussement</h1> <hr className="auth hr" />{" "}
      <h2 className="heading-subtitle">Online Chat App</h2>
      <LoginForm />
    </main>
  );
};

export default Login;
