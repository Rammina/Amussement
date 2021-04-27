import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

// check the authenticated route component, this is to avoid having the & characters cut out
const getOriginalQueryString = (processedString) => {
  if (!processedString) return "";
  return processedString.replace(/AMPERSAND_PLACEHOLDER/g, "&");
};

function UnauthenticatedRoute(props) {
  const { children, ...rest } = props;
  const { search } = useLocation();

  const { redirect } = queryString.parse(search);
  // need to process redirect
  const originalRedirect = getOriginalQueryString(redirect);

  return (
    <Route {...rest}>
      {!props.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={
            originalRedirect === "" || originalRedirect === null
              ? "/"
              : originalRedirect
          }
        />
      )}
    </Route>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(UnauthenticatedRoute);
