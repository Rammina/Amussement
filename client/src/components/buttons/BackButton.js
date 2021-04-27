import LeftArrowImg from "../../icons/left-arrow.png";
import "./BackButton.scss";

import React, { useEffect } from "react";

const BackButton = (props) => {
  useEffect(() => {
    // code to run on first render
  }, []);

  const onClickHandler = () => {
    if (props.onClickHandler) {
      props.onClickHandler();
    }
  };
  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getButtonId = () => (props.buttonId ? props.buttonId : "");
  const getImageId = () => (props.imageId ? props.imageId : "");
  const getHideOnDesktopClass = () =>
    props.hideOnDesktop ? "hide-on-desktop" : "";

  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;

  return (
    <React.Fragment>
      {renderButtonLabel()}
      <button
        className={`back-button ${getClassName()} ${getHideOnDesktopClass()}`}
        id={`${getButtonId()}`}
        onClick={onClickHandler}
        type="button"
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        // there should be an image here instead
      >
        <img
          id={`${getImageId()}`}
          className={`back-icon-img ${getClassName()}`}
          src={LeftArrowImg}
          alt="Left Arrow Icon"
        />
      </button>
    </React.Fragment>
  );
};

export default BackButton;
