import React, { useState, useEffect } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import { useLocation, useHistory } from "react-router-dom";
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
  let history = useHistory();

  const alert = useAlert();
  const [data, setData] = useState();
  const [tag, setTag] = useState("");

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

  const handleDelete = (id) => () => {
    axios
      .delete("/v1/tags/" + id)
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          getTags();
          alert.show("Data deleted successfully", {
            type: "success",
          });
        } else {
          alert.show("There is something wrong with your data or server", {
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/admin");

          alert.show("Your credentials expired, please login again", {
            type: "error",
          });
        } else {
          alert.show("Error: Check your internet connection", {
            type: "error",
          });
        }
      });
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const getTags = async () => {
    axios
      .get("/v1/tags")
      .then((response) => {
        setData(response.data.data.tags);
        console.log(response);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/admin");

          alert.show("Your credentials expired, please login again", {
            type: "error",
          });
        }
        console.log(err);
      });
  };

  const saveTag = async () => {
    axios
      .post("/v1/tags", {
        tag: tag,
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          getTags();
          setTag("");
          alert.show("Data saved successfully", {
            type: "success",
          });
        } else {
          alert.show("There is something wrong with your data", {
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/admin");

          alert.show("Your credentials expired, please login again", {
            type: "error",
          });
        } else {
          alert.show("Error: Check your internet connection", {
            type: "error",
          });
        }
      });
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          <div className="title-md m-3">Tags</div>

          <div className="d-flex justify-content-between mr-5">
            <input
              type="text"
              className="input-new mb-2 mt-5"
              aria-describedby="search"
              placeholder="Type new category here .."
              value={tag}
              onChange={handleChange}
              style={{ padding: "10px" }}
            ></input>
            <Button
              isPrimary
              type="button"
              onClick={saveTag}
              style={{ height: "40px" }}
              className="btn text-white mt-5 ml-3"
            >
              Save
            </Button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Tag name</th>
                <th scope="col">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object) => (
                  <tr key={object.id_tag}>
                    <th scope="row">{object.id_tag}</th>
                    <td>{object.name}</td>
                    <td>
                      <Button
                        type="link"
                        style={{ backgroundColor: "green", padding: "3px" }}
                        href={"/admin/tags/" + object.id_tag}
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
                        onClick={handleDelete(object.id_tag)}
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
                ))}
            </tbody>
          </table>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
