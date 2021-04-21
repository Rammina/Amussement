import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const renderContent = () => (
    <>
      <div className="user-communication-button-image-container">
        {props.children}
      </div>
      <span
        className={`user-profile-card-button-text ${props.className || ""}`}
      >
        {props.text}
      </span>
    </>
  );

  return props.isLink ? (
    <Link
      className={`user-profile-card-button ${props.className || ""}`}
      onClick={onClickHandler}
      to={props.to}
    >
      {renderContent()}
    </Link>
  ) : (
    <button
      className={`user-profile-card-button ${props.className || ""}`}
      onClick={onClickHandler}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
