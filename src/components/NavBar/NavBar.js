import React from "react";
import { Link, useHistory } from "react-router-dom";

import { authenticate, firebaseAuth } from "../../config/firebaseAuth";
import CONSTANTS from "../../constants";
import { v4 } from "uuid";

function NavBar() {
  const history = useHistory();

  function handleCreateDocumentOnClick() {
    firebaseAuth().onAuthStateChanged(async function (user) {
      if (user) {

        history.push(`/documents/${v4()}`);
      } else {
        authenticate();
      }
    });
  }

  function handleLoginOnClick() {
    authenticate();
  }

  async function handleLogoutOnClick() {
    try {
      await firebaseAuth().signOut();

      history.push("/");

    } catch (err) {
      alert(err);
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
