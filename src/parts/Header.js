import React from "react";
import Button from "../elements/Button";
export default function Header(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };
  return (
    <header className="spacing-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Mize.
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className={`nav-item${getNavLinkClass("/")}`}>
                <Button className="nav-link" type="link" href="/">
                  Blog
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/about")}`}>
                <Button className="nav-link" type="link" href="/about">
                  About
                </Button>
              </li>

              <li className={`nav-item${getNavLinkClass("/projects")}`}>
                <Button className="nav-link" type="link" href="/projects">
                  Projects
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/contact")}`}>
                <Button className="nav-link" type="link" href="/contact">
                  Contact
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
