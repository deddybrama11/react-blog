import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import SideNavbar from "parts/SideNavbar";
import $ from "jquery";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "constants/editorconst";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "react-multi-select-component";
import { useLocation, useHistory } from "react-router-dom";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";

export default function CreateArticle() {
  const alert = useAlert();
  var object = {};
  object.location = useLocation();
  let history = useHistory();

  const instanceRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataTags, setDataTags] = useState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [isLoadingTag, setIsLoadingTag] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [slug, setSlug] = useState();

  async function handleSave() {
    const savedData = await instanceRef.current.save();
    let ctgrs = [];
    categories.map((ob) => {
      ctgrs = [...ctgrs, ob.value];
    });

    let tgs = [];
    tags.map((object) => {
      tgs = [...tgs, object.value];
    });

    const instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_IMAGE_URL}`,
    });

    const formData = new FormData();
    formData.append("image", coverPhoto);

    const url = await instance
      .post("/image/upload", formData)
      .then((response) => {
        if (response.data.success === true) {
          alert.show("Cover Image berhasil di uplaod", {
            type: "success",
          });
        } else {
          alert.show(response.data.errorMessage, {
            type: "error",
          });
        }
        return response.data.data.location;
      })
      .catch((err) => {
        console.log(err);
        if (err.response !== undefined) {
          alert.show("Error: " + err.response.data.errorMessage, {
            type: "error",
          });
        }
        if (err.message === "Network Error") {
          alert.show("Error: " + err.message, {
            type: "error",
          });
        }
      });

    await axios
      .post("/v1/posts", {
        title: title,
        description: description,
        content: JSON.stringify(savedData),
        cover: url,
        slug: slug,
        categories: ctgrs,
        tags: tgs,
      })
      .then((response) => {
        if (response.data.success === true) {
          alert.show("Artikel berhasil disimpan", {
            type: "success",
          });
        } else {
          alert.show(response.data.errorMessage, {
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
          alert.show("Error: " + err.response.data.errorMessage, {
            type: "error",
          });
        }
      });
  }

  const fileImg = useRef();
  const handleImage = () => {
    setCoverPhoto(fileImg.current.files[0]);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSlug = (e) => {
    setSlug(e.target.value);
  };

  useEffect(() => {
    axios
      .get("v1/categories")
      .then((response) => {
        if (response.data.data.categories !== null) {
          response.data.data.categories.map((object) => {
            setDataCategory((category) => [
              ...category,
              { label: object.category, value: object.id_category },
            ]);
            setIsLoadingCategory(false);
          });
        } else {
          throw new Error("NODATA");
        }
      })
      .catch((err) => {
        if (err.message !== undefined) {
          if (err.message === "Network Error") {
            alert.show("Network Error, please comeback later", {
              type: "error",
            });
          } else if (err.message === "NODATA") {
            console.log("masuk sinis");
            alert.show("Please add category", {
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
          }
        }
        console.log(err);
      });

    axios
      .get("v1/tags")
      .then((response) => {
        if (response.data.data.tags !== null) {
          response.data.data.tags.map((object) => {
            setDataTags((tags) => [
              ...tags,
              { label: object.name, value: object.id_tag },
            ]);
            setIsLoadingTag(false);
          });
        } else {
          throw new Error("NODATA");
        }
      })
      .catch((err) => {
        if (err.message !== undefined) {
          if (err.message === "Network Error") {
            alert.show("Network Error, please comeback later", {
              type: "error",
            });
          } else if (err.message === "NODATA") {
            console.log("masuk sinis");
            alert.show("Please add category", {
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
          }
        }
        console.log(err);
      });
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
              style={{ marginLeft: "-5px", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
          </div>
          <div className="row p-2 ml-2">
            <span className="title-md">
              <FontAwesomeIcon icon={faBars} /> New Article
            </span>
          </div>
          <div className="row" style={{ height: "100%", marginLeft: "2px" }}>
            <div className="col-md-9 p-2">
              <div className="card card-border-blue card-editor">
                <div className="card-body">
                  Your content here
                  <div id="editorjs">
                    <EditorJs
                      instanceRef={(instance) =>
                        (instanceRef.current = instance)
                      }
                      tools={EDITOR_JS_TOOLS}
                    />
                  </div>
                  <Button
                    type="submit"
                    isPrimary
                    isLarge
                    hasShadow
                    className="btn text-white"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-2">
              <div className="card card-border-blue" style={{ height: "85vh" }}>
                <div
                  className="card-title text-center title-article-sm mt-4"
                  style={{ fontSize: "18px" }}
                >
                  Article Information
                </div>
                <hr style={{ marginTop: "3px", marginBottom: "3px" }}></hr>
                <div
                  className="card-body"
                  style={{ padding: "1rem", overflow: "auto" }}
                >
                  <div className="title-xs">Title</div>
                  <textarea
                    className="form-control input-new mb-3 mt-2"
                    id="exampleFormControlTextarea1"
                    placeholder="Enter title"
                    rows="3"
                    value={title}
                    onChange={handleTitle}
                  ></textarea>
                  <div className="title-xs">Description</div>
                  <textarea
                    className="form-control input-new mb-3 mt-2"
                    id="exampleFormControlTextarea1"
                    placeholder="Enter title"
                    rows="3"
                    value={description}
                    onChange={handleDescription}
                  ></textarea>

                  <div className="title-xs">Image</div>
                  <input
                    type="file"
                    className="form-control-file  mb-3 mt-2"
                    aria-describedby="titleArticle"
                    ref={fileImg}
                    // value={this.state.value}
                    onChange={handleImage}
                  ></input>
                  <div className="title-xs">Slug</div>
                  <input
                    type="text"
                    className="form-control input-new mb-3 mt-2"
                    aria-describedby="slugArticle"
                    placeholder="Enter slug"
                    value={slug}
                    onChange={handleSlug}
                  ></input>
                  <div className="title-xs">Category</div>
                  <MultiSelect
                    isLoading={isLoadingCategory}
                    className="mb-3 mt-2"
                    options={dataCategory}
                    value={categories}
                    onChange={setCategories}
                    labelledBy="Select"
                  />

                  <div className="title-xs">Tags</div>
                  <MultiSelect
                    isLoading={isLoadingTag}
                    className="mb-3 mt-2"
                    options={dataTags}
                    value={tags}
                    onChange={setTags}
                    labelledBy="Select"
                  />
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
