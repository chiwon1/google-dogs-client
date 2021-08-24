import React from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticate, firebaseAuth } from "../../config/firebaseAuth";

function NavBar({ changeLoginStatusToLogout, loginStatus }) {
  const history = useHistory();

  function handleCreateDocumentOnClick() {
    if (loginStatus) {
      history.push("/documents/new");
    } else {
      authenticate();
    }
  }

  function handleLoginOnClick() {
    authenticate();
  }

  async function handleLogoutOnClick() {
    try {
      await firebaseAuth().signOut();

      changeLoginStatusToLogout();
      history.push("/");
      console.log("// Sign-out successful.");

    } catch (err) {
      console.log("// An error happened.", err);
    }
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <button onClick={handleCreateDocumentOnClick}>Create Document</button>
      <button onClick={handleLoginOnClick}>Login</button>
      <button onClick={handleLogoutOnClick}>Logout</button>
    </nav>
  );
}

export default NavBar;
