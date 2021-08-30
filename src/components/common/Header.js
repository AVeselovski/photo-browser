import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useUi } from "../../context/UiContext";

const Header = ({ links = [] }) => {
  const { toggleNav } = useUi();

  const renderNav = (links) => (
    <ul data-testid="header-nav">
      {links.map((l, i) => (
        <li key={`${l.name}-${i}`}>
          <NavLink activeClassName="active" to={l.path}>
            {l.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

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
          <button data-testid="mobile-nav-toggle-open" className="header-nav-toggle" onClick={toggleNav}>
            &#9776;
          </button>
          {!!links.length && renderNav(links)}
        </nav>
      </div>
    </div>
  );
};

export default Header;
