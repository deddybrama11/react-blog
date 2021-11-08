import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { useLocation, useHistory } from "react-router-dom";
import React, { useRef } from "react";
import image from "../assets/images/image-rais.png";
import imagededy from "../assets/images/image-dedy.jpeg";
import Project from "elements/Project";
export default function PortfolioPage() {
  var object = {};
  object.location = useLocation();
  const contactRef = useRef();
  return (
    <div className="portfolio">
      <Header {...object} contactRef={contactRef} />
      {/* <div
        className="article-page row gradient-bg-article"
        style={{ height: "680px" }}
      ></div> */}
      <div
        className="d-flex flex-column d-block mt-5 justify-content-center container container-portfolio"
        style={{ width: "100%" }}
      >
        <div className="text-center wrapper-title-content">About</div>
        <div
          className="row mt-5"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="col-md">
            {" "}
            Hello, I'm <span className="color-indigo">Lufri Rais Maulana</span>,
            22 years old, Backend Developer and love to make an article, based
            in Pati, Central Java.
          </div>
          <div className="col-md d-none d-md-block d-lg-block name-portfolio text-right">
            {" "}
            <div>RAIS</div> <div>MAULANA</div>
          </div>
        </div>
      </div>
      <div>
        <img
          className="mt-5 d-none d-md-block"
          src={image}
          style={{ objectFit: "cover", width: "100%", height: "400px" }}
        ></img>
      </div>
      <div className="container mt-4">
        <p>
          Right now im focusing in Go, i have experience in Web and Android
          Development. but my focus is still in backend development. i love to
          play games too ! some games like Dota2, CSGO, Pokemon, Valheim,
          Valorant and other online games(no gacha game) Currently im learning
          GPRC and AWS.
        </p>
        <div className="text-center wrapper-title-content mt-5">
          WHAT I HAVE DONE
        </div>

        {/* ----------------------------- desktop ----------------------------- */}
        <div className="d-none d-md-flex flex-wrap justify-content-between mt-5">
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
        </div>

        {/* ----------------------------- mobile ----------------------------- */}
        <div className="mt-5 d-block d-md-none">
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
        </div>
      </div>




      <div
        className="d-flex flex-column d-block mt-5 justify-content-center container container-portfolio"
        style={{ width: "100%" }}
      >
        <div className="text-center wrapper-title-content">About</div>
        <div
          className="row mt-5"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="col-md">
            {" "}
            Hello, I'm <span className="color-indigo">Dedy Bramayadi</span>,
            22 years old, Frontend Developer and love to make an article, based
            in Jember, East Java.
          </div>
          <div className="col-md d-none d-md-block d-lg-block name-portfolio text-right">
            {" "}
            <div>DEDY</div> <div>BRAMAYADI</div>
          </div>
        </div>
      </div>
      <div>
        <img
          className="mt-5 d-none d-md-block"
          src={imagededy}
          style={{ objectFit: "cover", width: "100%", height: "400px" }}
        ></img>
      </div>
      <div className="container mt-4">
        <p>
          Right now im focusing in Go, i have experience in Web and Android
          Development. but my focus is still in backend development. i love to
          play games too ! some games like Dota2, CSGO, Pokemon, Valheim,
          Valorant and other online games(no gacha game) Currently im learning
          GPRC and AWS.
        </p>
        <div className="text-center wrapper-title-content mt-5">
          WHAT I HAVE DONE
        </div>

        {/* ----------------------------- desktop ----------------------------- */}
        <div className="d-none d-md-flex flex-wrap justify-content-between mt-5">
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            className="col-4"
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
        </div>

        {/* ----------------------------- mobile ----------------------------- */}
        <div className="mt-5 d-block d-md-none">
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
          <Project
            image={image}
            description="Nunc cursus a turpis a dapibus. Nunc dolor orci, rutrum et
              pharetra id, euismod vitae lacus. Ut in dignissim urna. Sed
              semper, tellus a condimentum blandit, neque justo porttitor nulla,
              v"
          />
        </div>
      </div>
      <Footer contactRef={contactRef} />
    </div>
  );
}
