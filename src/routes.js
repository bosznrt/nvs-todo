import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
// import Loadable from "./components/Loadable";

import { userIsAuthenticated } from "auth";

import TodoPage from "pages/todos";
import LoginPage from "pages/login";

// const AsyncLogin = Loadable({ loader: () => import("./pages/login") });
// const AsyncTodo = userIsAuthenticated(Loadable({ loader: () => import("./pages/todos") }));

const Login = LoginPage;
const Todo = userIsAuthenticated(TodoPage);

const history = createHistory();

const Routes = ({ childProps }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Todo} props={childProps} />
      </Switch>
    </Router>
  );
};

export default connect()(Routes);
