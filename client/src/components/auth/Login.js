// auth/Signup.js
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AuthService from "./AuthService";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login-form">
        <p>{this.state.error ? "error " : ""}</p>
        <form className="loginForm" onSubmit={this.handleFormSubmit}>
          {/* <label>name</label> */}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            placeholder="name:"
          />

          {/* <label>pass</label> */}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            placeholder="| password:"
          />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
