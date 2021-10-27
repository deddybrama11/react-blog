import Button from "elements/Button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsers } from "../redux";

function LoginPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  let history = useHistory();

  if (localStorage.getItem("token") !== null) {
    history.push("/admin/articles");
  }

  useEffect(() => {
    if (users.length !== 0) {
      localStorage.setItem("token", users.data.token);
      localStorage.setItem("username", username);
      history.push("/admin/articles");
    }
  }, [users]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const processLogin = (e) => {
    e.preventDefault();
    console.log("username : " + username + ", pass : " + password);
    dispatch(fetchUsers(username, password));
  };

  if (localStorage.getItem("token") !== null) {
    history.push("/admin/articles");
  }

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
            Codermuda.
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
                {error !== "" && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "red",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {error.errorMessage}
                  </div>
                )}
                <form onSubmit={(e) => processLogin(e)}>
                  <input
                    type="text"
                    className="form-control input-new mb-4"
                    aria-describedby="usernameHelp"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: "25px" }}
                  ></input>
                  <input
                    type="password"
                    className="form-control input-new"
                    aria-describedby="passwordHelp"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{ padding: "25px" }}
                  ></input>
                  {loading ? (
                    <p className="mt-3">Sedang memproses, mohon tunggu ...</p>
                  ) : (
                    <Button
                      isPrimary
                      hasShadow
                      type="submit"
                      style={{ width: "100%", height: "40px" }}
                      className="btn text-white mt-5"
                    >
                      Sign in
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
