import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import axios from "axios";

import auth from "./hoc/auth";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={auth(Home, null)} />
          <Route exact path="/documents" component={auth(TextEditor, null)} />
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
