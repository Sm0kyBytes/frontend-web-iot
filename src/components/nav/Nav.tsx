import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/register">Register here</Link>
        </li>
        <li>
          <Link to="/manage">Manage Devices here</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
