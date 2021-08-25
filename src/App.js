import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home/";
import Document from "./pages/Document/";

import NavBar from "./components/NavBar";

import { v4 } from "uuid";
import { firebaseAuth } from "./config/firebaseAuth";
import { updateToken } from "./api/firebaseAuth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseAuth().onAuthStateChanged(async function (user) {
      if (user) {
        const token = await user.getIdToken();

        updateToken(token);

        setIsLoggedIn(true);
        setUser(user);
      }
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route path="/documents/new" exact>
          {isLoggedIn && <Redirect to={`/documents/${v4()}`} />}
        </Route>
        <Route path="/documents/:id">
          {isLoggedIn && <Document user={user} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
