import React from "react";
import { NavLink } from "react-router-dom";

import { useUi } from "../../context/UiContext";

const MobileNav = ({ links = [] }) => {
  const { mobileNavOpen, toggleNav } = useUi();

  const renderNav = (links) => (
    <ul>
      {links.map((l, i) => (
        <li key={`${l.name}-${i}`}>
          <NavLink activeClassName="active" onClick={() => toggleNav()} to={l.path}>
            {l.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className={`mobile-nav${mobileNavOpen ? " open" : ""}`}>
        <div className="mobile-nav-header">
          <button data-testid="mobile-nav-toggle-close" onClick={toggleNav}>
            &#x2715;
          </button>
        </div>
        <div className="mobile-nav-body">{!!links.length && renderNav(links)}</div>
      </div>
      <div className={`backdrop${mobileNavOpen ? " open" : ""}`} onClick={toggleNav}></div>
    </>
  );
};

export default MobileNav;
