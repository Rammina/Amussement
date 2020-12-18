/* credits to:
https://loading.io/css/
*/

import "./LoadingSpinner.css";

import React from "react";

const LoadingSpinner = (props) => {
  return props.showLoader ? (
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
