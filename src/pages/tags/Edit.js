import React, { useState, useEffect } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";

export default function EditTags(props) {
  let { id } = useParams();
  const history = useNavigate();
  const alert = useAlert();

  var object = {};
  object.location = useLocation();

  const [tag, setTag] = useState("");

  const getTag = async () => {
    axios
      .get("/v1/tags/" + id)
      .then((response) => {
        setTag(response.data.data.tag);
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

  const updateTag = async () => {
    axios
      .put("/v1/tags/" + id, {
        tag: tag,
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
        alert.show("Error: Check your internet connection", {
          type: "error",
        });
      });
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    getTag();
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
              placeholder="Type new tag here .."
              value={tag}
              onChange={handleChange}
              style={{ padding: "10px" }}
            ></input>
            <Button
              href="#"
              isPrimary
              type="button"
              onClick={updateTag}
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
