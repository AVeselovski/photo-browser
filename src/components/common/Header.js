import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useUi } from "../../context/UiContext";

const Header = () => {
  const { toggleNav } = useUi();

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="brand">
          <Link to="/">
            Photo<span>Browser</span>
          </Link>
        </h1>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <button className="header-nav-toggle" onClick={toggleNav}>
            &#9776;
          </button>
          <ul>
            <li>
              <NavLink activeClassName="active" to="/photos">
                All photos
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/albums">
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/users">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
