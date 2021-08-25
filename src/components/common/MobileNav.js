import React from "react";
import { NavLink } from "react-router-dom";

import { useUi } from "../../context/UiContext";

const MobileNav = () => {
  const { mobileNavOpen, toggleNav } = useUi();

  return (
    <>
      <div className={`mobile-nav${mobileNavOpen ? " open" : ""}`}>
        <div className="mobile-nav-header">
          <button onClick={toggleNav}>&#x2715;</button>
        </div>
        <div className="mobile-nav-body">
          <ul>
            <li>
              <NavLink activeClassName="active" onClick={toggleNav} to="/photos">
                All photos
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" onClick={toggleNav} to="/albums">
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" onClick={toggleNav} to="/users">
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={`backdrop${mobileNavOpen ? " open" : ""}`} onClick={toggleNav}></div>
    </>
  );
};

export default MobileNav;
