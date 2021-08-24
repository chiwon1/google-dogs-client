import React from "react";
import { Link, useHistory } from "react-router-dom";

import { authenticate, firebaseAuth } from "../../config/firebaseAuth";
import CONSTANTS from "../../constants";

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
      <Link to="/">{CONSTANTS.HOME}</Link>
      <button onClick={handleCreateDocumentOnClick}>{CONSTANTS.CREATE_DOCUMENT}</button>
      <button onClick={handleLoginOnClick}>{CONSTANTS.LOGIN}</button>
      <button onClick={handleLogoutOnClick}>{CONSTANTS.LOGOUT}</button>
    </nav>
  );
}

export default NavBar;
