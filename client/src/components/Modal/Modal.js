import "./Modal.scss";

import React, { useState, useEffect } from "react";

import ModalHeader from "./ModalHeader/ModalHeader";
import ModalFooter from "./ModalFooter/ModalFooter";

import { clearErrors } from "../../flux/actions/errorActions";
import { connect } from "react-redux";

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {}, []);

  const getModalOpenClass = () => (modalOpen ? "show" : "hide");

  const modalOnCloseHandler = () => {
    setModalOpen(false);

    setTimeout(() => {
      console.log("closing modal");
      props.onModalClose();
      // Remove errors
      props.clearErrors();
    }, 300);
  };

  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getModalId = () => (props.modalId ? props.modalId : "");

  const getIsSlideUpClass = () => (props.isSlideUp ? "slide-up" : "");

  // render functions

  const renderModalHeader = () => {
    if (props.noHeader) return null;
    return (
      <ModalHeader
        componentClass={`${getClassName()}`}
        headerClassName={props.headerClassName}
        onModalClose={modalOnCloseHandler}
        headingText={props.headingText || null}
      />
    );
  };
  const renderModalFooter = () => {
    if (props.noFooter) return null;
    return (
      <ModalFooter
        componentClass={`${getClassName()}`}
        footerClassName={props.footerClassName}
        onModalClose={modalOnCloseHandler}
        actionButtons={props.actionButtons}
        autoFocusOnCancel={props.autoFocusOnCancel || false}
      />
    );
  };

  return (
    <React.Fragment>
      <div
        className={`backdrop ${getModalOpenClass()} ${getClassName()}`}
        onClick={modalOnCloseHandler}
      ></div>
      <div
        className={`modal ${getModalOpenClass()} ${getClassName()} ${getIsSlideUpClass()}`}
        id={getModalId()}
        style={props.modalStyle || {}}
      >
        {renderModalHeader()}
        {props.children}
        {renderModalFooter()}
      </div>{" "}
    </React.Fragment>
  );
};
export default connect(null, { clearErrors })(Modal);
