import CloseIconImg from "../../icons/close-icon.png";
import "./CancelButton.scss";

import React, { useEffect, useContext } from "react";

const CancelButton = props => {
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

  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;

  return (
    <React.Fragment>
      {renderButtonLabel()}
      <button
        // ref={context.setCancelButtonRef}
        className={`close-button ${getClassName()}`}
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
    </React.Fragment>
  );
};

export default CancelButton;
