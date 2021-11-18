import Swal from "sweetalert2";
import React from "react";

export const errorHandling = (err) => {
  console.log(err.response);
  if (err.message !== undefined) {
    if (err.message === "Network Error") {
      console.log("Network error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network Error, please comeback later",
      });
      return;
    }
  }
  if (err.response !== undefined) {
    if (err.response.status === 401) {
      console.log("masuk ke 401");
      localStorage.clear();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your credentials expired, please login again",
      });
    }
  }

  if (err.errorMessage !== undefined) {
    console.log("errorMessage == " + err.errorMessage);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.errorMessage,
    });
    return;
  }

  if (err.response.data.errorMessage !== undefined) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.errorMessage,
    });
    return;
  }
};
