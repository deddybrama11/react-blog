import React, { useState, useEffect, useCallback, useRef } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $, { type } from "jquery";
import { useLocation } from "react-router-dom";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";

export default function ProfilePage(props) {
  var object = {};
  object.location = useLocation();
  const alert = useAlert();

  const [imgSrc, setImgSrc] = useState();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthDay] = useState(new Date());
  const [webProfile, setWebProfile] = useState("");
  const [photoProfile, setPhotoProfile] = useState();

  useEffect(() => {
    axios
      .get("v1/users/username/" + localStorage.getItem("username"))
      .then((response) => {
        setName(response.data.data.name);
        setCity(response.data.data.city);
        setCountry(response.data.data.country);
        setBirthDay(new Date(response.data.data.birthday));
        setWebProfile(response.data.data.web_profile);
        setImgSrc(response.data.data.photo_profile)
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fileImg = useRef();

  const handleImage = useCallback(() => {
    if (window.FileReader) {
      setPhotoProfile(fileImg.current.files[0]);
      var file = fileImg.current.files[0];
      var reader = new FileReader();
      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
      }
    }
    reader.onloadend = function (e) {
      setImgSrc([reader.result]);
    }.bind(this);
  });

  const handleSave = useCallback((event) => {
    console.log("submit clicked");

    if (photoProfile) {
      
      const formData = new FormData();
      formData.append("photo_profile", photoProfile);

      axios
        .post("v1/users/"+localStorage.getItem("id_user")+"/photo-profile", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log("gagal upload gambar");
        });
    }

    axios
      .put("v1/users/" + localStorage.getItem("id_user"), {
        name: name,
        city: city,
        country: country,
        birthday: birthday,
        web_profile: webProfile,
      })
      .then((response) => {
        alert.show("Data saved successfully", {
          type: "success",
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert.show("Error: Failed to save data", {
          type: "error",
        });
      });
    event.preventDefault();
  });

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
          <div className="title-md m-3">Profile Information</div>
          <form onSubmit={handleSave}>
            <div className="row ml-3 mb-5">
              <div style={{ position: "relative" }}>
                <label
                  htmlFor="photo-input"
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 0,
                    right: 5,
                  }}
                >
                  <div
                    className="card shadow"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      padding: "5px",
                      borderRadius: "100px",
                    }}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                </label>
                <input
                  id="photo-input"
                  type="file"
                  ref={fileImg}
                  name="user[image]"
                  multiple={true}
                  onChange={handleImage}
                  style={{ display: "none" }}
                ></input>
                <img
                  className="rounded-circle shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  src={imgSrc}
                ></img>
              </div>
              <div className="d-flex align-items-center ml-3">
                <div>
                  <div style={{ fontWeight: "600", fontSize: "20px" }}>
                    {name}
                  </div>
                  <div>
                    {city}, {country}
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="d-flex flex-wrap justify-content-between">
              <div className="col-12">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control input-new mb-4"
                  aria-describedby="nameHelp"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: "25px" }}
                ></input>
              </div>
              <div className="col-5">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  className="form-control input-new mb-4"
                  aria-describedby="cityHelp"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ padding: "25px" }}
                ></input>
              </div>
              <div className="col-5">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  className="form-control input-new mb-4"
                  aria-describedby="countryHelp"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ padding: "25px" }}
                ></input>
              </div>
              <div className="col-5">
                <label htmlFor="birthday">Birthday</label>
                <ReactDatePicker
                  dateFormat="dd/MM/yyyy"
                  onChange={(e) => setBirthDay(e)}
                  selected={birthday}
                  className="form-control input-new"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-5">
                <label htmlFor="web-profile">Web Profile</label>
                <input
                  id="web-profile"
                  type="text"
                  className="form-control input-new mb-4"
                  aria-describedby="countryHelp"
                  placeholder="Enter your Web Profile"
                  value={webProfile}
                  onChange={(e) => setWebProfile(e.target.value)}
                  style={{ padding: "25px" }}
                ></input>
              </div>

              <div className="d-flex justify-content-center col-12">
                <Button
                  type="submit"
                  isPrimary
                  hasShadow
                  type="submit"
                  style={{ width: "150px", height: "40px" }}
                  className="btn text-white mt-3"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
