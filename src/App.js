import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import auth from "./hoc/auth";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={auth(Home, null)} />
        <Route path="/documents/new" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
