
import Button from "elements/Button";
import React from "react";

export default function Hero() {
    function showArticle(){
        window.scrollTo({
            top:200,
            behavior:"smooth"
        })
    }
  return (
    <div className="row gradient-bg" style={{ height: "680px" }}>
      <img
        className="img-fluid"
        style={{ height: "auto", objectFit: "cover" }}
        src="/image/image-hero.jpg"
      ></img>
      <div className="wrapper-hero-content">
        <div className="container" style={{ marginTop: "250px" }}>
          <div className="col-sm-6 text-tes">
            Welcome To Mize.
            <br></br>Enjoy yourself here!
            <Button
                className="btn px-5"
                isPrimary
                hasShadow
                onClick={showArticle}
                style={{ marginTop: "50px" }}
              >
                Click me
              </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
