import React, { useState, useEffect, useCallback, useRef } from "react";
import SideNavbar from "parts/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import { useLocation, useHistory } from "react-router-dom";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Button from "elements/Button";
import axios from "axios";
import { useAlert } from "react-alert";
import { fetchUserData, postUserData } from "../redux";
import Loading from "parts/Loading";

export default function ProfilePage(props) {
  var object = {};
  object.location = useLocation();
  const alert = useAlert();
  let history = useHistory();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.userData);
  const { loading, error } = data;
  const [imgSrc, setImgSrc] = useState();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthDay] = useState(new Date());
  const [webProfile, setWebProfile] = useState("");
  const [photoProfile, setPhotoProfile] = useState();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (data.users.name !== undefined) {
      setName(data.users.name);
      setCountry(data.users.country);
      setCity(data.users.city);
      setBirthDay(new Date(data.users.birthday));
      setWebProfile(data.users.web_profile);
      setPhotoProfile(data.users.photo_profile);
    }
  }, [data]);

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
    if (photoProfile) {
      const formData = new FormData();
      formData.append("photo_profile", photoProfile);

      axios
        .post(
          "v1/users/" + localStorage.getItem("id_user") + "/photo-profile",
          formData
        )
        .then((response) => {
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
        });
    }
    dispatch(
      postUserData({
        name: name,
        city: city,
        country: country,
        birthday: birthday,
        webProfile: webProfile,
        id_user: data.users.id_user,
      })
    );
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
          <div className="title-md m-3">Profile Information</div>
          {loading ? (
            <Loading />
          ) : (
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
                    src={photoProfile}
                  ></img>
                </div>
                <div className="d-flex align-items-center ml-3">
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "20px" }}>
                      {data?.users?.name}
                    </div>
                    <div>
                      {data?.users?.city}, {data?.users?.country}
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
          )}
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
