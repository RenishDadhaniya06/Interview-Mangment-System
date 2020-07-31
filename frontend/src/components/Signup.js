import React, { Component } from "react";
import classes from "./SignUp.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

class SignUp extends Component {
  registerHandler = async (e) => {
    localStorage.setItem("Auth", "Done");
    e.preventDefault();
    const data = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    await axios
      .post("http://localhost:3000/users", data)
      .then((response) => {
        localStorage.setItem("Auth1", response.data.token);
        axios.defaults.headers.common["Authorization"] = response.data.token;
        this.props.history.push("/home");
      })
      .catch((e) => {
        console.log("Error:", e.response);
        document.getElementById("signup").innerHTML = e.response.data.Message;
      });
  };

  render() {
    localStorage.clear();
    return (
      <div className={classes.SignUp}>
        Register
        <br />
        <form className="form-group" onSubmit={(e) => this.registerHandler(e)}>
          <input
            className="form-control"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <br />
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <div id="signup"></div>
          <br />
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <br />
          Already A User <NavLink to="/login">Sign In</NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
