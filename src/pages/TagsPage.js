import React, { useState, useEffect } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  faAlignLeft,
  faPencilAlt,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "elements/Button";
import { useAlert } from "react-alert";
import { deleteTag, fetchTags, postTag } from "redux/tags/tagAction";
import Loading from "parts/Loading";

export default function CategoriesPage(props) {
  var object = {};
  object.location = useLocation();
  let history = useNavigate();

  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

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

  useEffect(() => {
    dispatch(fetchTags());
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
          <div className="title-md m-3">Tags</div>

          <div className="d-flex justify-content-between mr-5">
            <input
              type="text"
              className="input-new mb-2 mt-5"
              aria-describedby="search"
              placeholder="Type new category here .."
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
              style={{ padding: "10px" }}
            ></input>
            <Button
              href="#"
              isPrimary
              type="button"
              onClick={() => {
                dispatch(postTag(tag));
              }}
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
              {loading ? (
                <Loading />
              ) : (
                tags &&
                tags.data &&
                tags.data.tags &&
                tags.data.tags.map((object) => (
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
                        onClick={() => {
                          dispatch(deleteTag(object.id_tag));
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
