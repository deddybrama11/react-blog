import React, { useState, useEffect, useCallback, useRef } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $, { map, type } from "jquery";
import { useLocation, useHistory, useParams } from "react-router-dom";
import {
  faAlignLeft,
  faPencilAlt,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";

export default function EditCategory(props) {
  let { id } = useParams();
  const history = useHistory();
  const alert = useAlert();

  var object = {};
  object.location = useLocation();

  const [category, setCategory] = useState("");

  const getCategory = async () => {
    axios
      .get("/v1/categories/" + id)
      .then((response) => {
        setCategory(response.data.data.category);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/admin");

          alert.show("Your credentials expired, please login again", {
            type: "error",
          });
        }
      });
  };

  const updateCategory = async () => {
    axios
      .put("/v1/categories/" + id, {
        category: category,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          alert.show("Data updated successfully", {
            type: "success",
          });
          history.goBack();
        } else {
          alert.show("There is something wrong with your data or server", {
            type: "error",
          });
        }
      })
      .catch((err) => {
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
    setCategory(e.target.value);
  };

  useEffect(() => {
    getCategory();
  }, []);

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
              placeholder="Type new category here .."
              value={category}
              onChange={handleChange}
              style={{ padding: "10px" }}
            ></input>
            <Button
              isPrimary
              type="button"
              onClick={updateCategory}
              style={{ height: "40px" }}
              className="btn text-white mt-5 ml-3"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
