import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.css";


const App = props => {

  const { location: { pathname } } = props;
  const path = pathname.split("/")[1];

  return (
    <div className={`App ${path}`}>
      <Header />
      <div className="App-wrapper">
        <Switch>
          <Route path="/" exact strict component={Home} />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(App);
