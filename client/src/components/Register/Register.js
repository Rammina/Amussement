import DoorImg from "../../icons/door.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.scss";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <h1 className="heading-title">Amussement</h1>
      <div className="joinInnerContainer">
        <div className="door-title-container">
          <div className="door-img-container">
            <img className="door-icon-img" src={DoorImg} alt="Door" />
          </div>
          <h2 className="heading">Create an account</h2>
        </div>
        <div className="join-textfield-container">
          <label for="email" className="textfield-label">
            Email
          </label>
          <input
            name="email"
            placeholder="Email"
            className="join-textfield"
            type="text"
            maxlength="64"
            onChange={() => {}}
          />
        </div>
        <div className="join-textfield-container">
          <label for="username" className="textfield-label">
            Username
          </label>
          <input
            name="username"
            placeholder="Username"
            className="join-textfield"
            type="text"
            maxlength="30"
            onChange={() => {}}
          />
        </div>
        <div className="join-textfield-container">
          <label for="password" className="textfield-label">
            Password
          </label>
          <input
            name="password"
            placeholder="Password"
            className="join-textfield"
            type="password"
            maxlength="30"
            onChange={() => {}}
          />
        </div>
        <div className="join-textfield-container">
          <label for="date-of-birth" className="textfield-label">
            Date of Birth
          </label>
          <input
            name="date-of-birth"
            placeholder="Date of Birth"
            className="join-textfield"
            type="date"
            onChange={() => {}}
          />
        </div>
        <div className="join-button-container">
          <Link
            className="join-button-link"
            onClick={() => {}}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className={"join-button mt-20"} type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
