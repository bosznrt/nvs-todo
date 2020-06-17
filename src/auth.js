// import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
// import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";

// const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/login",
  authenticatedSelector: (state) => state.user.token != null,
  wrapperDisplayName: "UserIsAuthenticated",
});
