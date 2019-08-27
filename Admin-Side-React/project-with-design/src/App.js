import React from "react";
import { withRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faCogs,
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faCogs,
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes
);

const App = props => {
  return (
    <React.Fragment>
      <Route exact path="/" render={() => <Login {...props} />} />
      <Route exact path="/Main" render={() => <Main {...props} />} />
    </React.Fragment>
  );
};

export default withRouter(App);
