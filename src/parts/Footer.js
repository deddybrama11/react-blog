import React from "react";
// import Button from "elements/Button";
export default function Footer() {
  return (
    <div style={{ width:"100%" }} className="mt-5">
      <footer>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-sm mt-2" >
              <a href="/" style={{ fontSize: "30px", fontWeight: "600" }}>
                Codermuda.
              </a>
              <p className="brand-tagline">
                Hello ! Enjoy our blog. say something to us if there was
                something you dont like.
              </p>
            </div>

            <div className="col-sm mt-2">
              <h6 className="mt-2">Github</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">github.com/raismaulana</li>
                <li className="list-group-item">github.com/deddybrama11</li>
              </ul>
            </div>

            <div className="col-sm mt-2">
              <h6 className="mt-2">Email</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">rais@codermuda.com</li>
                <li className="list-group-item">bram@codermuda.com</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col text-center copyrights">
              Copyright 2021 - All rights reserved - Codermuda.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
