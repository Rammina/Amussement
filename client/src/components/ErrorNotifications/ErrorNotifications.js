import "./ErrorNotifications.scss";

import React from "react";

import ErrorNotification from "./ErrorNotification";

const ErrorNotifications = props => {
  const renderErrors = () => {
    const renderError = message => {
      return <ErrorNotification message={message} />;
    };
    if (Array.isArray(props.message)) {
      return props.message.map(message => renderError(message));
    } else if (!Array.isArray(props.message)) {
      return renderError(props.message);
    } else {
      return null;
    }
  };

  return props.message ? (
    <div className="error-notifications-container" role="alert">
      {renderErrors()}
    </div>
  ) : null;
};

export default ErrorNotifications;
