import DoorImg from "../../icons/door.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.scss";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join page-container">
      <h1 className="heading-title">Amussement</h1>
      <form
        id="join-form"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="form-content-container">
          <div className="door-title-container">
            <div className="door-img-container">
              <img className="door-icon-img" src={DoorImg} alt="Door" />
            </div>
            <h2 className="heading">Join as Guest</h2>
          </div>
          <div className="textfield-container">
            <input
              placeholder="Name"
              className="textfield"
              type="text"
              maxlength="20"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="textfield-container">
            <input
              placeholder="Room"
              className="textfield"
              type="text"
              onChange={event => setRoom(event.target.value)}
            />
          </div>
          <div className="form-button-container join">
            <Link
              id="join-submit-link"
              onClick={e => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?guestName=${name}&room=${room}`}
            >
              <button className={"form-button submit mt-20 join"} type="submit">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
