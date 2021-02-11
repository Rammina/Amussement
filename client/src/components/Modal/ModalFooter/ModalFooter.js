import "./ModalFooter.scss";

import React, { useState, useEffect, useRef, useContext } from "react";

import CancelButton from "../../buttons/CancelButton";
// import { ModalContext } from "../../AppContext";

//note: test the use of context, remove props. from the variables
const ModalFooter = (props) => {
  // simplify/return properties from parent component (e.g. className)
  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getFooterClassName = () =>
    props.footerClassName ? props.footerClassName : "";

  const renderCancelButton = () => {
    if (props.noCancelButton) return null;
    return (
      <CancelButton
        componentClass={getClassName()}
        hideOnMobile={true}
        onClickHandler={() => {
          props.onModalClose();
        }}
      />
    );
  };

  const renderActionButtons = () => {
    if (!props.actionButtons) return null;
    return props.actionButtons;
  };

  return (
    <div className={`modal-footer ${getClassName()} ${getFooterClassName()}`}>
      <div className="modal-footer-buttons-container">
        {renderCancelButton()}
        {renderActionButtons()}
      </div>
    </div>
  );
};
export default ModalFooter;
