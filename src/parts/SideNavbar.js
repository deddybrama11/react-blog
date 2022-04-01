import React from "react";
import Button from "elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createMemoryHistory } from "history";
import {
  faNewspaper,
  faList,
  faTags,
  faUser,
  faSignOutAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function SideNavbar(props) {
  const history = createMemoryHistory();
  const getNavLinkClass = (path) => {
    return history === path ? "active" : "";
  };

  return (
    <div
      className="d-flex flex-column col-3 side-navbar bg-young-blue"
      id="sidebar"
      style={{ height: "100vh", padding: 0 }}
    >
      <div
        id="dismiss"
        style={{
          alignSelf: "flex-end",
          paddingRight: "20px",
          marginTop: "10px",
        }}
      >
        <i>
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
      </div>
      <span
        className="title-lg text-center text-blue"
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        Codermuda.
      </span>
      <div className="d-flex flex-column side-navbar-item">
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/articles")}`}
          href={`/admin/articles`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faNewspaper} /> {"\u00A0"}Articles
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/categories")}`}
          href={`/admin/categories`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faList} /> {"\u00A0"}Categories
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/tags")}`}
          href={`/admin/tags`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faTags} /> {"\u00A0"}Tags
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/profile")}`}
          href={`/admin/profile`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faUser} /> {"\u00A0"}Profile
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/logout")}`}
          href={`/admin`}
          onClick={() => {
            if (window.confirm("Are you sure want to logout ?"))
              localStorage.clear();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faSignOutAlt} /> {"\u00A0"}Logout
          </div>
        </Button>
      </div>
    </div>
  );
}
