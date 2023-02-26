import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import { Link } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...userData },
      });
      Auth.login(data.addUser.token);
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
        <h2 className="logintext">Register</h2>
        <form
          noValidate
          validated={validated ? "true" : "false"}
          className="register-form"
          onSubmit={handleSubmit}
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your signup!
          </Alert>
          <label htmlFor="username">Full Name</label>
          <input
            required
            onChange={handleInput}
            value={userData.username}
            type="text"
            name="username"
            id="name"
            placeholder="Full Name"
          />
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
            disabled={
              !(userData.username && userData.email && userData.password)
            }
            className="login-btn"
            type="submit"
          >
            Register
          </button>
        </form>
        <Link to="/" className="Logintext">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Register;
