import SideNavbar from "parts/SideNavbar";
import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import $ from "jquery";
import {
  faAlignLeft,
  faPencilAlt,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPosts, deletePost } from "../redux";
import Loading from "parts/Loading";

export default function Articles(props) {
  var object = {};
  object.location = useLocation();
  const dispatch = useDispatch();
  let history = useHistory();

  const alert = useAlert();

  useEffect(() => {
    $("#dismiss, .overlay, .side-navbar-item").on("click", function () {
      // hide sidebar
      $("#sidebar").removeClass("active");
      // hide overlay
      $(".overlay").removeClass("active");
    });

    $("#sidebarCollapse").on("click", function () {
      // open sidebar
      $("#sidebar").addClass("active");
      // fade in the overlay
      $(".overlay").addClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
  });

  const [data, setData] = useState();
  const { posts, loading, error, update } = useSelector(
    (state) => state.articles
  );

  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY3RpdmF0ZWQiOnRydWUsIkVtYWlsIjoiYnJhbUBjb2Rlcm11ZGEuY29tIiwiSUQiOjMsIlJvbGUiOiJhZG1pbiIsImF1ZCI6Imh0dHA6Ly9hcGkuY29kZXJtdWRhLmNvbSIsImV4cCI6MTYzNjA4MDA5NiwianRpIjoiNjM4ZTZjYmItN2VkZS00ZDRhLTk3ZWItNWI3MmRjZTY4ZDFmIiwiaWF0IjoxNjM1OTA3Mjk2LCJpc3MiOiJodHRwOi8vYXBpLmNvZGVybXVkYS5jb20iLCJuYmYiOjE2MzU5MDcyOTYsInN1YiI6IkQgQnJhbWF5YWRpIn0.kZTmlCNiBeotcvwwVdRKUWZunA_OOQcBANqbncSfNkI")

  useEffect(() => {
    if (update) {
      dispatch(fetchPosts());
    }
  }, [update]);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ height: "100%", display: "block" }}
    >
      <div className="row" style={{ height: "100%" }}>
        <SideNavbar {...object} />
        <div className="col" style={{ overflow: "auto", height: "100vh" }}>
          <div className="row">
            <button
              id="sidebarCollapse"
              className="btn btn-primary"
              style={{ marginLeft: "-5px", marginTop: "10px" }}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
          </div>
          <div className="title-md m-3">Articles</div>

          <div className="d-flex justify-content-between mr-5">
            <input
              type="text"
              className="input-new mb-2 mt-5"
              aria-describedby="search"
              placeholder="Search"
              // value={this.state.value}
              // onChange={this.handleChange}
              style={{ padding: "10px" }}
            ></input>
            <Button
              isPrimary
              type="link"
              href={`/admin/articles/create`}
              style={{ height: "40px" }}
              className="btn text-white mt-5 ml-3"
            >
              Create
            </Button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Article name</th>
                <th scope="col">cover</th>
                <th scope="col">categories</th>
                <th scope="col">tags</th>
                <th scope="col">slug</th>
                <th scope="col">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                posts &&
                posts.map((object) => (
                  <tr key={object.id_post}>
                    <th scope="row">{object.id_post}</th>
                    <td>{object.title}</td>
                    <td>
                      <img
                        src={object.cover}
                        className="img-fluid img-thumbnail"
                        alt={object.slug}
                        style={{ height: "100px" }}
                      />
                    </td>
                    <td>
                      {object.categories
                        ? object.categories.map(
                            (child) => child.category + ", "
                          )
                        : ""}
                    </td>
                    <td>
                      {object.tags
                        ? object.tags.map((child) => child.tag + ", ")
                        : ""}
                    </td>
                    <td>{object.slug}</td>
                    <td>
                      <Button
                        type="link"
                        style={{ backgroundColor: "green", padding: "3px" }}
                        href={"/admin/articles/" + object.id_post}
                      >
                        <FontAwesomeIcon
                          style={{
                            color: "white",
                            marginRight: "3px",
                            marginLeft: "3px",
                          }}
                          icon={faPencilAlt}
                        />
                      </Button>
                      <Button
                        href="#"
                        type="link"
                        onClick={() => {
                          dispatch(deletePost(object.id_post));
                        }}
                        style={{ backgroundColor: "red", padding: "3px" }}
                      >
                        <FontAwesomeIcon
                          style={{
                            color: "white",
                            marginRight: "3px",
                            marginLeft: "3px",
                          }}
                          icon={faEraser}
                        />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
