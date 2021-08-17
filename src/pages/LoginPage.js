import Button from "elements/Button";
import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("name was submited: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="bg-blue" style={{ height: "100%" }}>
        <div className="container" style={{ height: "100%" }}>
          <div
            className="d-flex flex-column justify-content-center align-content-center flex-wrap"
            style={{ height: "100%" }}
          >
            <span
              className="title-lg text-center"
              style={{ marginBottom: "20px" }}
            >
              Mize.
            </span>
            <div
              class="card col-sm-8 shadow"
              style={{ height: "auto", borderRadius: "20px" }}
            >
              <div class="card-body">
                <h5 class="card-title text-center title-md mt-3">
                  Welcome Back!
                </h5>
                <h6
                  class="card-subtitle mb-2 text-muted text-center mt-2"
                  style={{ fontSize: "14px", fontWeight: 400 }}
                >
                  Enter your credentials to access your account
                </h6>
                <div className="container mt-5" style={{ width: "85%" }}>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="email"
                      class="form-control input-new mb-4"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={this.state.value}
                      onChange={this.handleChange}
                      style={{ padding: "25px" }}
                    ></input>
                    <input
                      type="password"
                      class="form-control input-new"
                      aria-describedby="emailHelp"
                      placeholder="Enter password"
                      style={{ padding: "25px" }}
                    ></input>
                    <Button
                      isPrimary
                      hasShadow
                      type="submit"
                      style={{ width: "100%" }}
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
