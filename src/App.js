import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home/";
import Document from "./pages/Document/";

import NavBar from "./components/NavBar";

import { v4 } from "uuid";
import { firebaseAuth } from "./config/firebaseAuth";
import { updateToken } from "./api/firebaseAuth";

function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    firebaseAuth().onAuthStateChanged(async function (user) {
      if (user) {
        const token = await user.getIdToken();

        updateToken(token);

        setIsLogin(true);
      }
    });
  }, []);

  function handleLoginStatus() {
    setIsLogin(false);
  }

  return (
    <div>
      <NavBar
        changeLoginStatusToLogout={handleLoginStatus}
        loginStatus={isLogin}
      />
      <Switch>
        <Route exact path="/">
          <Home loginStatus={isLogin} />
        </Route>
        <Route path="/documents/new" exact>
          {isLogin && <Redirect to={`/documents/${v4()}`} />}
        </Route>
        <Route path="/documents/:id">
          {isLogin && <Document />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
