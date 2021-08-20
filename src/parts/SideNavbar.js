import React from "react";
import Button from "elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faList,
  faTags,
  faComment,
  faUsers,
  faUser,
  faSignOutAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function SideNavbar(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  return (
    <div
      className="d-flex flex-column col-3 side-navbar bg-young-blue"
      id="sidebar"
      style={{ height: "100%", padding: 0 }}
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
        Mize.
      </span>
      <div className="d-flex flex-column side-navbar-item">
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/articles/")}`}
          href={`/admin/articles/`}
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
          className={`item ${getNavLinkClass("/admin/comments/")}`}
          href={`/admin/comments/`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faComment} /> {"\u00A0"}Comments
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/users/")}`}
          href={`/admin/users/`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faUsers} /> {"\u00A0"}Users
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/profile/")}`}
          href={`/admin/profile/`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faUser} /> {"\u00A0"}Users
          </div>
        </Button>
        <Button
          type="link"
          className={`item ${getNavLinkClass("/admin/logout/")}`}
          href={`/admin/logout/`}
          // onClick={showArticle}
        >
          <div>
            <FontAwesomeIcon icon={faSignOutAlt} /> {"\u00A0"}Logout
          </div>
        </Button>
      </div>
    </div>
  );
}
