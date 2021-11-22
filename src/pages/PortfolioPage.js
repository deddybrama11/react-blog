import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { useLocation, useHistory, useParams } from "react-router-dom";
import React, { useRef } from "react";
import image from "../assets/images/rais.jpg";
import imagededy from "../assets/images/image-dedy.jpeg";
import diagnosa from "../assets/images/diagnosa.jpg";
import myorder from "../assets/images/myorder.jpg";
import penjadwalan from "../assets/images/penjadwalan.jpg";
import sikopen from "../assets/images/sikopen.webp";
import bramweather from "../assets/images/bramweather.jpg";
import codermuda from "../assets/images/codermuda.jpg";

import Project from "elements/Project";

export default function PortfolioPage() {
  var object = {};
  object.location = useLocation();
  const contactRef = useRef();
  let { name } = useParams();
  console.log(name);
  if (name == "dedy") {
    return (
      <div className="portfolio" style={{ marginTop: "120px" }}>
        <Header {...object} contactRef={contactRef} />
        {/* <div
          className="article-page row gradient-bg-article"
          style={{ height: "680px" }}
        ></div> */}

        <div
          className="d-flex flex-column d-block mt-5 justify-content-center container container-portfolio gradient-bg-article"
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
              22 years old, Frontend Developer and love to make an article,
              based in Jember, East Java.
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
            I'm highly motivated and hardworking individual person, I like to
            explore whats new in programming technology and conquer it ! I'm not
            smart, just curious to see how things work. I'm also not that good
            of a writer as you can see. Right now i'm seeking a job in the
            informatics industry and career as a Mobile Programmer or Web
            Programmer.
          </p>
          <p>
            Working on starting an app development business and always looking
            for new clients! Would love to talk to you about your idea..
          </p>
          <div className="text-center wrapper-title-content mt-5">
            WHAT I HAVE DONE
          </div>

          {/* ----------------------------- desktop ----------------------------- */}
          <div className="d-none d-md-flex flex-wrap justify-content-between mt-5">
            <Project
              title="CODERMUDA."
              image={codermuda}
              className="col-4 mt-3"
              description="Codermuda is a blog and my personal portfolio as you can see. This web is made by using react and go where im the frontend and my friend Rais is the backend. This is my latest project"
            />
            <Project
              title="SIKOPEN"
              image={sikopen}
              className="col-4 mt-3"
              description="Absensi Online is a useful system to facilitate the attendance process of your company's employees. Recorded in real-time and more accurately than existing conventional attendance systems so you can monitor your employee's attendance list easily. I was participated building this app when i was working on CV Soluta"
            />
            <Project
              title="APLIKASI DIAGNOSA PENYAKIT TOMAT"
              image={diagnosa}
              className="col-4 mt-3"
              description="Aplikasi Diagnosa Penyakit dan Hama pada Tanaman Tomat is an application that can detect diseases and pests on tomato plants using a camera on a cellphone. This application uses a neural network algorithm for the detection of diseases and pests. I build this app as my thesis"
            />
            <Project
              title="PENJADWALAN OPERATOR SATELIT"
              image={penjadwalan}
              className="col-4 mt-3"
              description="Penjadwalan Operator Satelit is a web-based app that focuses on operator staff scheduling. Scheduling on the web is done automatically using genetic algorithms and simulated annealing. this is a project i worked on when i was an intern at the LAPAN satellite technology center"
            />
            <Project
              title="BRAM WEATHER"
              image={bramweather}
              className="col-4 mt-3"
              description="Bram Weather is a mobile application that can display today's weather. This application was an assignment when I was in college."
            />
            <Project
              title="MY ORDER"
              image={myorder}
              className="col-4 mt-3"
              description="My Order is a web-based application that aims to digitize restaurants. The features of this app is cashier, kitchen and manager. This application was a final project when I was in college."
            />
          </div>

          {/* ----------------------------- mobile ----------------------------- */}
          <div className="mt-5 d-block d-md-none">
            <Project
              title="CODERMUDA."
              image={codermuda}
              description="Codermuda is a blog and my personal portfolio as you can see. This web is made by using react and go where im the frontend and my friend Rais is the backend. This is my latest project"
            />
            <Project
              title="SIKOPEN"
              image={sikopen}
              description="Absensi Online is a useful system to facilitate the attendance process of your company's employees. Recorded in real-time and more accurately than existing conventional attendance systems so you can monitor your employee's attendance list easily. I was participated building this app when i was working on CV Soluta"
            />
            <Project
              title="APLIKASI DIAGNOSA PENYAKIT TOMAT"
              image={diagnosa}
              description="Aplikasi Diagnosa Penyakit dan Hama pada Tanaman Tomat is an application that can detect diseases and pests on tomato plants using a camera on a cellphone. This application uses a neural network algorithm for the detection of diseases and pests. I build this app as my thesis"
            />
            <Project
              title="PENJADWALAN OPERATOR SATELIT"
              image={penjadwalan}
              description="Penjadwalan Operator Satelit is a web-based app that focuses on operator staff scheduling. Scheduling on the web is done automatically using genetic algorithms and simulated annealing. this is a project i worked on when i was an intern at the LAPAN satellite technology center"
            />
            <Project
              title="BRAM WEATHER"
              image={bramweather}
              description="Bram Weather is a mobile application that can display today's weather. This application was an assignment when I was in college."
            />
            <Project
              title="MY ORDER"
              image={myorder}
              description="My Order is a web-based application that aims to digitize restaurants. The features of this app is cashier, kitchen and manager. This application was a final project when I was in college."
            />
          </div>
        </div>
        <Footer contactRef={contactRef} />
      </div>
    );
  } else if (name == "rais") {
    return (
      <div className="portfolio" style={{ marginTop: "120px" }}>
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
              Hello, I'm{" "}
              <span className="color-indigo">Lufri Rais Maulana</span>, 22 years
              old, Backend Developer and love to make an article, based in Pati,
              Central Java.
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
          {/* <div className="text-center wrapper-title-content mt-5">
            WHAT I HAVE DONE
          </div> */}

          {/* ----------------------------- desktop ----------------------------- */}
          {/* <div className="d-none d-md-flex flex-wrap justify-content-between mt-5">
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
          </div> */}

          {/* ----------------------------- mobile ----------------------------- */}
          {/* <div className="mt-5 d-block d-md-none">
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
          </div> */}
        </div>
        <Footer contactRef={contactRef} />
      </div>
    );
  }
}
