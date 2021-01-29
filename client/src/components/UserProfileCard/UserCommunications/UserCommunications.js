import ChatIconImg from "../../../icons/chat.png";

import React from "react";

const UserCommunications = (props) => {
  // note: mobile and desktop versions should be different
  return (
    <section
      className="user-profile-card-section-sub-container"
      id="user-communication-buttons-container"
    >
      <button className="user-communication-button" onClick={() => {}}>
        <div className="user-communcation-button-image-container">
          <img
            className={`user-communication-button-image`}
            src={ChatIconImg}
            alt="Chat Bubble Icon"
          />
        </div>
        <span className="user-communication-button-text">Message</span>
      </button>
      <button className="user-communication-button" onClick={() => {}}>
        Call
      </button>
      <button className="user-communication-button" onClick={() => {}}>
        Video
      </button>
    </section>
  );
};

export default UserCommunications;
