import React from "react";
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes";
import "./AppHeader.scss";

function AppHeader({ ...props }) {
  return (
    <header className="header-bg mb-4" {...props}>
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand navbar-dark">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to={routes.HOME}
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
