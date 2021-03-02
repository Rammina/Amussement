import React from "react";

const Button = (props) => {
  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className={`user-profile-card-button ${props.className || ""}`}
      onClick={onClickHandler}
    >
      <div className="user-communication-button-image-container">
        {props.children}
      </div>
      <span
        className={`user-profile-card-button-text ${props.className || ""}`}
      >
        {props.text}
      </span>
    </button>
  );
};

export default Button;
