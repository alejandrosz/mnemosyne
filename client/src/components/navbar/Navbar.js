// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.scss";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, isSignup: false };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  changeState() {
    this.setState({
      isSignup: !this.state.isSignup
    });
  }

  render() {
    return (
      <nav className="nav-style">
        <input
          type="text"
          onKeyDown={e => this.props.searchBar(e)}
          placeholder="search"
        ></input>
        {this.state.loggedInUser ? (
          <React.Fragment>
            <div className="profile-navbar">
              {" "}
              <Link to="/profile">
                {" "}
                <h1>{this.state.loggedInUser.username}</h1>
              </Link>
              <a onClick={this.handleLogout}>logout</a>
            </div>
          </React.Fragment>
        ) : (
          <ul>
            {this.state.isSignup ? (
              <div className="user-buttons">
                <Login getUser={this.props.getUser} />
                <button
                  className="change-style"
                  onClick={() => this.changeState()}
                >
                  or signup
                </button>
              </div>
            ) : (
              <div className="user-buttons">
                <Signup getUser={this.props.getUser} />
                <button
                  className="change-style"
                  onClick={() => this.changeState()}
                >
                  or login
                </button>
              </div>
            )}
          </ul>
        )}
      </nav>
    );
  }
}

export default Navbar;
