import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// note: this is only a temporary solution to prevent & characters from cutting out the redirect link
const getProcessedQueryString = (queryString) => {
  if (!queryString) return "";
  return queryString.replace(/&/g, "AMPERSAND_PLACEHOLDER");
};

function AuthenticatedRoute(props) {
  const { children, ...rest } = props;
  const { pathname, search } = useLocation();

  const processedSearch = getProcessedQueryString(search);

  return (
    <Route {...rest}>
      {props.isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/auth/login?redirect=${pathname}${processedSearch}`} />
      )}
    </Route>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(AuthenticatedRoute);
