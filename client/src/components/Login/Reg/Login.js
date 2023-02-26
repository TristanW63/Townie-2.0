import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = (props) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="App">
      <div className="auth-form-container">
        <h1 className="logo">The Townie</h1>
        <h2 className="logintext">Login</h2>
        <form
          noValidate
          validated={validated ? "true" : "false"}
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            <Alert.Heading>Something went wrong with your login!</Alert.Heading>
          </Alert>
          <label htmlFor="email">Email</label>
          <input
            required
            value={userData.email}
            onChange={handleInput}
            type="email"
            placeholder="test123@email.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            required
            value={userData.password}
            onChange={handleInput}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button
            disabled={!(userData.email && userData.password)}
            className="login-btn"
            type="submit"
          >
            Log In
          </button>
        </form>
        <Link to="/register" className="Logintext">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Login;
