import React, { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };
  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/login", creds)
      .then(response => {
        console.log(response.data);
        const { data } = response;
        localStorage.setItem("token", data.payload);
        props.history.push('/users')
      })
      .catch(error => {
        console.log("LOGIN ERROR", error);
      });
  };

  return (
    <>
      <h1>Welcome!</h1>
      <form onSubmit={login}>
        <legend>{loggedIn ? "logged in" : "please login"}</legend>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={creds.username}
          onChange={handleChange}
        />
        <input 
        type="password"
        name="password"
        placeholder="password"
        value={creds.password}
        onChange={handleChange}
        />
        <button type="submit" >Login</button>
      </form>
      <Link to="/register">click here to register</Link>
    </>
  );
};
export default Login