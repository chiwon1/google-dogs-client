import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/api/login">Login</Link>
      <Link to="/api/logout">Logout</Link>
      <Link to="/documents/new">Create Document</Link>
    </nav>
  );
}

export default NavBar;
