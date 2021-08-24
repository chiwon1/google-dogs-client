import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/";
import { v4 as uuidV4 } from "uuid";
import { authenticate, firebaseAuth } from "./config/firebaseAuth";
import { updateToken } from "./api/firebaseAuth";
import Document from "./pages/Document/";

function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    firebaseAuth().onAuthStateChanged(async function(user) {
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
          {isLogin && <Redirect to={`/documents/${uuidV4()}`}/>}
        </Route>
        <Route path="/documents/:id">
          {isLogin && <Document />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
