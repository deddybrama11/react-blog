import React from "react";
import loadingImg from "../assets/images/loading-buffering.gif";

export default function Loading() {
  return (
    <div
      className="d-flex mt-5 justify-content-center"
      style={{ width: "100%" }}
    >
      <img className="loading" src={loadingImg} alt="loading" />
    </div>
  );
}
