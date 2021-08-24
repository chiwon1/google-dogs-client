import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { authenticate, firebaseAuth } from "../../config/firebaseAuth";
import { updateToken } from "../../api/firebaseAuth";

function NavBar() {
  useEffect(() => {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken()
          .then(token => updateToken(token));
      }
    })
  }, []);

  function handleLoginOnClick() {
    authenticate();
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/documents/new">Create Document</Link>
      <button onClick={handleLoginOnClick}>Login</button>
      <button>Logout</button>
    </nav>
  );
}

export default NavBar;
