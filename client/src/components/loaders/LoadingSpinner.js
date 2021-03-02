/* credits to:
https://loading.io/css/
*/

import "./LoadingSpinner.scss";

import React from "react";

const LoadingSpinner = (props) => {
  return props.showLoader ? (
    <div className={`lds-ring ${props.className || ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
