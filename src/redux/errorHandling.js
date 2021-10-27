export const errorHandling = (err) => {
  if (err.message !== undefined) {
    if (err.message === "Network Error") {
      console.log("network error tapi di error handling");
      return "Network Error, please comeback later";
    }
  }
  if (err.response !== undefined) {
    if (err.response.status === 401) {
      localStorage.clear();
      return "Your credentials expired, please login again";
    }
  }
};
