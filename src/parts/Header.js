import React from "react";
import Button from "../elements/Button";
import { createMemoryHistory } from "history";

export default function Header(props) {
  const history = createMemoryHistory();
  const getNavLinkClass = (path) => {
    return history === path ? "active" : "";
  };
  return (
    <header
      className="spacing-sm shadow-sm mb-5 bg-white"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 999,
        backgroundColor: "white",
      }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Codermuda.
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
              <li className={`nav-item${getNavLinkClass("/about")} dropdown`}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  About us
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/portfolio/rais">
                    L Rais Maulana
                  </a>
                  <a className="dropdown-item" href="/portfolio/dedy">
                    Dedy Bramayadi
                  </a>
                </div>
              </li>
              <li className={`nav-item${getNavLinkClass("/contact")}`}>
                <Button
                  href="#"
                  className="nav-link"
                  type="link"
                  onClick={() => {
                    props.contactRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
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
