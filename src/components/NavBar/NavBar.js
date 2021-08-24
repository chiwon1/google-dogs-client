import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { authenticate, firebaseAuth } from "../../config/firebaseAuth";
import { updateToken } from "../../api/firebaseAuth";

function NavBar({ logout }) {
  function handleLoginOnClick() {
    authenticate();
  }

  function handleLogoutOnClick() {
    firebaseAuth().signOut().then(() => {
      logout();
      console.log("// Sign-out successful.");
    }).catch((error) => {
      console.log("// An error happened.");
    });
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/documents/new">Create Document</Link>
      <button onClick={handleLoginOnClick}>Login</button>
      <button onClick={handleLogoutOnClick}>Logout</button>
    </nav>
  );
}

export default NavBar;
