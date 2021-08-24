import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";
import { firebaseAuth } from "./config/firebaseAuth";
import { updateToken } from "./api/firebaseAuth";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  console.log("userInfo", userInfo);

  useEffect(() => {
    firebaseAuth().onAuthStateChanged(user => {
      console.log("user", user);
      if (user) {
        user.getIdToken()
          .then(token => updateToken(token));

        setUserInfo(user);
      }
    })
  }, []);

  function handleLogout() {
    setUserInfo(null);
  }

  return (
    <div>
      <NavBar logout={handleLogout}/>
      <Switch>
        <Route exact path="/">
          <Home userInfo={userInfo} />
        </Route>
        <Route path="/documents/new" exact>
          {userInfo && <Redirect to={`/documents/${uuidV4()}`} />}
        </Route>
        <Route path="/documents/:id">
          {userInfo && <TextEditor />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
