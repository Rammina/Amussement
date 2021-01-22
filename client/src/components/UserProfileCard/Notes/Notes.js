import React from "react";

const Notes = (props) => {
  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container">
      <h4 className="user-profile-card-section-header">Note</h4>
      <form className="user-profile-card-notes-form">
        <textarea
          className="user-profile-card-notes-textarea"
          placeholder="Tap/click to add a note"
        ></textarea>
      </form>
    </section>
  );
};

export default Notes;
