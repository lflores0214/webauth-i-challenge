import React, { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const Login = (props) => {
  
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
  const register = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", creds)
      .then(response => {
        console.log(response.data);
        props.history.push('/')
      })
      .catch(error => {
        console.log("LOGIN ERROR", error);
      });
  };

  return (
    <>
      <h1>Welcome!</h1>
      <form onSubmit={register}>
        <legend>Create an account</legend>
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
        <button type="submit" >Register</button>
      </form>
      <Link to="/">Already have an account? Login here.</Link>
    </>
  );
};
export default Login