import "./CancelButton.scss";

import React, { useEffect } from "react";

const CancelButton = (props) => {
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

  const getHideOnMobileClass = () =>
    props.hideOnMobile ? "hide-on-mobile" : "";
  const getHideOnDesktopClass = () =>
    props.hideOnDesktop ? "hide-on-desktop" : "";

  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;

  return (
    <React.Fragment>
      <button
        className={`cancel-button ${getClassName()} ${getHideOnMobileClass()} ${getHideOnDesktopClass()}`}
        id={`${getButtonId()}`}
        onClick={onClickHandler}
        type="button"
        autoFocus={props.autoFocusOnCancel || false}
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        Cancel
      </button>
      {renderButtonLabel()}
    </React.Fragment>
  );
};

export default CancelButton;
