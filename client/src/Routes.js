import React, { Component } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Create from "./components/Create";
import Edit from "./components/Edit";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Auth} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/edit/:id" component={Edit} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
