import React from "react";

import CloseButton from "./CloseButton";
// import history from "../../history";

const SettingsCloseButton = (props) => {
  return (
    <CloseButton
      componentClass="settings-page"
      buttonId="settings-page-close-button"
      imageId="settings-page-close-image"
      buttonLabel={
        <span className="close-button-label" id="settings-page-close-label">
          esc
        </span>
      }
      onClickHandler={props.onClose}
    />
  );
};

export default SettingsCloseButton;
