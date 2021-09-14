import Button from "elements/Button";
import React, { Component } from "react";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      username: "",
      password: "",
      errMessage: "",
    };
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/admin/articles");
    }
  }

  userAuthenticated = () => {
    axios
      .get("v1/users/username/" + localStorage.getItem("username"))
      .then((response) => {
        console.log(response);
        localStorage.setItem("id_user", response.data.data.id_user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    delete axios.defaults.headers.common["Authorization"];
    axios
      .post("v1/users/auth", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data.errorCode === "") {
          console.log(response.data);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("username", this.state.username);
          axios.defaults.headers.common.Authorization =
            "Bearer " + localStorage.getItem("token");
          this.userAuthenticated();
          this.props.history.push("/admin/articles");

          axios.defaults.headers.common.Authorization =
            "Bearer " + localStorage.getItem("token");
        
          } else {
          this.setState({
            errMessage:
              response.data.errorMessage +
              ", Please check your username and password",
          });
        }
      })
      .catch((err) => {
        this.setState({
          errMessage:
            "There is something wrong in our system, please try again later",
        });
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="bg-blue" style={{ height: "100%" }}>
        <div className="container" style={{ height: "100%" }}>
          <div
            className="d-flex flex-column justify-content-center align-content-center flex-wrap"
            style={{ height: "100%", overflow: "hidden" }}
          >
            <span
              className="title-lg text-center"
              style={{
                marginBottom: "20px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Mize.
            </span>
            <div
              className="card col-sm-8 shadow"
              style={{ height: "auto", borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center title-md mt-3">
                  Welcome Back!
                </h5>
                <h6
                  className="card-subtitle mb-2 text-muted text-center mt-2"
                  style={{ fontSize: "14px", fontWeight: 400 }}
                >
                  Enter your credentials to access your account
                </h6>
                <div className="container mt-4" style={{ width: "85%" }}>
                  {this.state.errMessage !== "" && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "red",
                        marginBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      {this.state.errMessage}
                    </div>
                  )}
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      className="form-control input-new mb-4"
                      aria-describedby="usernameHelp"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.handleChangeUsername}
                      style={{ padding: "25px" }}
                    ></input>
                    <input
                      type="password"
                      className="form-control input-new"
                      aria-describedby="passwordHelp"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                      placeholder="Enter password"
                      style={{ padding: "25px" }}
                    ></input>
                    <Button
                      isPrimary
                      hasShadow
                      type="submit"
                      style={{ width: "100%", height: "40px" }}
                      className="btn text-white mt-5"
                    >
                      Sign in
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
