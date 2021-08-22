import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import SideNavbar from "parts/SideNavbar";
import $ from "jquery";

class CreateArticle extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
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
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ height: "100%", display: "block" }}
      >
        <div className="row" style={{ height: "100%" }}>
          <SideNavbar {...this.props} />
          <div className="col">
            <div className="row">
              <button
                id="sidebarCollapse"
                className="btn btn-primary"
                style={{ marginLeft: "-5px", marginTop: "5px" }}
              >
                <FontAwesomeIcon icon={faAlignLeft} />
              </button>
            </div>
            <div className="row p-2">
              <span className="title-md">New Article</span>
            </div>
            <div className="row" style={{ height: "100%" }}>
              <div className="col-9 p-2">
                <div
                  className="card card-border-blue"
                  style={{ height: "100%" }}
                >
                  <div className="card-body">
                    
                  </div>
                </div>
              </div>
              <div className="col-3 p-2">
                <div
                  className="card card-border-blue"
                  style={{ height: "100%" }}
                >
                  <div
                    className="card-title text-center title-article-sm mt-4"
                    style={{ fontSize: "18px" }}
                  >
                    Article Information
                  </div>
                  <hr></hr>
                  <div className="card-body" style={{ padding: "1rem" }}>
                    <div className="title-xs">Title</div>
                    <input
                      type="text"
                      className="form-control input-new mb-3 mt-2"
                      aria-describedby="titleArticle"
                      placeholder="Enter title"
                      // value={this.state.value}
                      // onChange={this.handleChange}
                    ></input>
                    <div className="title-xs">Image</div>
                    <input
                      type="text"
                      className="form-control input-new mb-3 mt-2"
                      aria-describedby="imageArticle"
                      placeholder="Enter description"
                      // value={this.state.value}
                      // onChange={this.handleChange}
                    ></input>
                    <div className="title-xs">Image</div>
                    <input
                      type="file"
                      className="form-control-file  mb-3 mt-2"
                      aria-describedby="titleArticle"
                      // value={this.state.value}
                      // onChange={this.handleChange}
                    ></input>
                    <div className="title-xs">Slug</div>
                    <input
                      type="text"
                      className="form-control input-new mb-3 mt-2"
                      aria-describedby="slugArticle"
                      placeholder="Enter slug"
                      // value={this.state.value}
                      // onChange={this.handleChange}
                    ></input>
                    <div className="title-xs">Category</div>
                    <input
                      type="text"
                      className="form-control input-new mb-3 mt-2"
                      aria-describedby="slugArticle"
                      placeholder="Enter category"
                      // value={this.state.value}
                      // onChange={this.handleChange}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
}

export default CreateArticle;
