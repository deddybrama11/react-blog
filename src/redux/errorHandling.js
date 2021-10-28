import Swal from "sweetalert2";

export const errorHandling = (err) => {
  if (err.message !== undefined) {
    if (err.message === "Network Error") {
      console.log("Network error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network Error, please comeback later",
      });
    }
  }
  if (err.response !== undefined) {
    if (err.response.status === 401) {
      localStorage.clear();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your credentials expired, please login again",
      });
    }
  }

  if (err.errorMessage !== "" || err.errorMessage !== undefined) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.errorMessage,
    });
  }
};
