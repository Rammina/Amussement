import React from "react";

const UserCommunications = (props) => {
  // note: mobile and desktop versions should be different
  return (
    <section
      className="user-profile-card-section-sub-container"
      id="user-communication-buttons-container"
    >
      <button className="user-communication-button" onClick={() => {}}>
        Message
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
