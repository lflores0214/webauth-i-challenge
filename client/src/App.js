import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./Components/Users";
import Login from "./Components/login";
import Register from "./Components/register"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/users" render={props => <Users {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/" render={props => <Login {...props} />} />
      </div>
    </Router>
  );
}

export default App;
