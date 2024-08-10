import React from "react";
import "./Navbar.scss";

export const Navbar: React.FC = () => {
  return (
    <nav className="lspoc-navbar">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo pl-4">
          Lore Spire
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="badges.html">Campaigns</a>
          </li>
          <li>
            <a href="sass.html">Characters</a>
          </li>
          <li>
            <a href="collapsible.html">Files</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
