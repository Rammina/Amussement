// import "./Modal.scss";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";
// should also import modal header component

const ModalHeader = props => {
  // simplify/return properties from parent component (e.g. className)
  const getClassName = () => (props.componentClass ? props.componentClass : "");

  const renderBackButton = () => {
    // do not render a back button
    // if there is a property that tells it to be removed
    if (props.noBackButton) return null;
    return (
      <BackButton
        componentClass={props.componentClass}
        hideOnDesktop={true}
        onClickHandler={() => {
          // this needs to be flexible
          // setImageUploadModalOpen(false); should be replaced with
          props.onModalClose();
        }}
      />
    );
  };

  return (
    <header className={`modal-header ${props.componentClass}`}>
      <div className="modal-heading-container modal-header-content-container">
        {renderBackButton()}
        <h3
          className={`modal-heading modal-header-heading ${props.componentClass} `}
        >
          {props.modalHeaderText}
        </h3>
        <CloseButton
          componentClass={`${props.componentClass}`}
          hideOnMobile={true}
          onClickHandler={() => {
            // this needs to be flexible
            // setImageUploadModalOpen(false); should be replaced with
            props.onModalClose();
          }}
        />
      </div>
    </header>
  );
};
export default ModalHeader;
