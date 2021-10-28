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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
} from "redux/categories/categoryAction";
import loadingImg from "../assets/images/loading-buffering.gif";
import Loading from "parts/Loading";

export default function CategoriesPage(props) {
  var object = {};
  object.location = useLocation();
  let history = useHistory();

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const alert = useAlert();
  const [data, setData] = useState();
  const [category, setCategory] = useState("");

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

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const saveCategory = async () => {
    axios
      .post("/v1/categories", {
        category: category,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          // getCategories();
          // setCategory("");
          alert.show("Data saved successfully", {
            type: "success",
          });
        } else {
          alert.show("There is something wrong with your data or server", {
            type: "error",
          });
        }
      })
      .catch((err) => {
        if (err.message !== undefined) {
          if (err.message === "Network Error") {
            alert.show("Network Error, please comeback later", {
              type: "error",
            });
          }
        }
        if (err.response !== undefined) {
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
        }
      });
  };
  useEffect(() => {
    // getCategories();
    dispatch(fetchCategories());
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
          <div className="title-md m-3">Categories</div>

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
              onClick={saveCategory}
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
                <th scope="col">Category name</th>
                <th scope="col">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                categories &&
                categories.data &&
                categories.data.categories &&
                categories.data.categories.map((object) => (
                  <tr key={object.id_category}>
                    <th scope="row">{object.id_category}</th>
                    <td>{object.category}</td>
                    <td>
                      <Button
                        type="link"
                        style={{ backgroundColor: "green", padding: "3px" }}
                        href={"/admin/categories/" + object.id_category}
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
                          dispatch(deleteCategory(object.id_category));
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
