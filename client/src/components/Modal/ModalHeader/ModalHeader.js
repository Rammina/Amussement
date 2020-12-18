import "./ModalHeader.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";
// import { ModalContext } from "../../AppContext";

//note: test the use of context, remove props. from the variables
const ModalHeader = (props) => {
  /*
  const {
    componentClass,
    headingText,
    hideOnDesktop,
    onModalClose,
    noHeader,
    noBackButton,
    modalContent,
  } = useContext(ModalContext);
*/

  // simplify/return properties from parent component (e.g. className)
  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getHeaderClassName = () =>
    props.headerClassName ? props.headerClassName : "";

  const renderBackButton = () => {
    // do not render a back button
    // if there is a property that tells it to be removed
    if (props.noBackButton) return null;
    return (
      <BackButton
        componentClass={getClassName()}
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
    <header
      className={`modal-header ${getClassName()} ${getHeaderClassName()}`}
    >
      <div className="modal-heading-container modal-header-content-container">
        {renderBackButton()}
        <h3 className={`modal-heading modal-header-heading ${getClassName()} `}>
          {props.headingText}
        </h3>
        <CloseButton
          componentClass={`modal-header ${getClassName()}`}
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
