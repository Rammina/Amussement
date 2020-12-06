import CloseIconImg from "../../icons/close-icon.png";
import "./CloseButton.scss";

import React, { useEffect, useContext } from "react";

const CloseButton = props => {
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
  const getHideOnMobileClass = () =>
    props.hideOnMobile ? "hide-on-mobile" : "";
  const getHideOnDesktopClass = () =>
    props.hideOnDesktop ? "hide-on-desktop" : "";

  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;

  return (
    <React.Fragment>
      <div
        className={`close-button-container ${getClassName()} ${getHideOnMobileClass()} ${getHideOnDesktopClass()}`}
      >
        <button
          // ref={context.setCloseButtonRef}

          className={`close-button ${getClassName()} ${getHideOnMobileClass()} ${getHideOnDesktopClass()}`}
          id={`${getButtonId()}`}
          onClick={onClickHandler}
          onKeyDown={e => {
            if (e.shiftKey && e.key === "Tab") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          // there should be an image here instead
        >
          <img
            id={`${getImageId()}`}
            className={`close-icon-img ${getClassName()}`}
            src={CloseIconImg}
            alt="X Icon"
          />
        </button>
        {renderButtonLabel()}
      </div>
    </React.Fragment>
  );
};

export default CloseButton;
