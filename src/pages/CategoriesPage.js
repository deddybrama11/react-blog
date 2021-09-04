import React, { useState, useEffect, useCallback, useRef } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $, { type } from "jquery";
import { useLocation } from "react-router-dom";
import {
  faAlignLeft,
  faPencilAlt,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";

export default function CategoriesPage(props) {
  var object = {};
  object.location = useLocation();

  const [data, setData] = useState({categories : []});

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
  }, []);

  //   const handleSave = useCallback((event) => {
  //     console.log("submit clicked");
  //   )
  //   }

  useEffect(() => {
    axios
      .get("/v1/categories")
      .then((response) => {
        console.log(response.data.data.categories)
        setData(response.data.data.categories);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ height: "100%", display: "block" }}
    >
      <div className="row" style={{ height: "100%" }}>
        <SideNavbar {...object} />
        <div className="col">
          <div className="row">
            <button
              id="sidebarCollapse"
              className="btn btn-primary"
              style={{ marginLeft: "-5px", marginTop: "10px" }}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
          </div>

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
              type="button"
              onClick={{}}
              //   href={`/admin/categories/create`}
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
                <th scope="col">Title</th>
                <th scope="col">Categories</th>
                <th scope="col">Tags</th>
                <th scope="col">Publish Date</th>
                <th scope="col">Publish</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>blabla</td>
                <td>blabla</td>
                <td>
                  <Button
                    type="link"
                    style={{ backgroundColor: "green", padding: "3px" }}
                    href={"/admin/articles/1/edit"}
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
                    type="link"
                    href={"/admin/articles/1/delete"}
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
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>blabla</td>
                <td>blabla</td>
                <td>
                  <Button
                    type="link"
                    style={{ backgroundColor: "green", padding: "3px" }}
                    href={"/admin/articles/1/edit"}
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
                    type="link"
                    href={"/admin/articles/1/delete"}
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
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>blabla</td>
                <td>blabla</td>
                <td>
                  <Button
                    type="link"
                    style={{ backgroundColor: "green", padding: "3px" }}
                    href={"/admin/articles/1/edit"}
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
                    type="link"
                    href={"/admin/articles/1/delete"}
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
            </tbody>
          </table>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
