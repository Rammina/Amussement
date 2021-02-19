import ChatIconImg from "../../../icons/chat.png";

import React from "react";

const UserCommunications = (props) => {
  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container buttons-container">
      <button className="user-profile-card-button" onClick={() => {}}>
        <div className="user-communcation-button-image-container">
          <img
            className={`user-profile-card-button-image`}
            src={ChatIconImg}
            alt="Chat Bubble Icon"
          />
        </div>
        <span className="user-profile-card-button-text">Message</span>
      </button>
      <button className="user-profile-card-button" onClick={() => {}}>
        Call
      </button>
      <button className="user-profile-card-button" onClick={() => {}}>
        Video
      </button>
    </section>
  );
};

export default UserCommunications;
