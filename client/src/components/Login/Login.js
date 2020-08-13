import DoorImg from "../../icons/door.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.scss";

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
          <h2 className="heading">Join Room</h2>
        </div>
        <div className="textfield-container">
          <input
            placeholder="Name"
            className="textfield"
            type="text"
            maxlength="20"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="textfield-container">
          <input
            placeholder="Room"
            className="textfield"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          className="join-button-link"
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"join-button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
