import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, isSignup: false };
  }

  render() {
    return (
      <div className="footer-style">
        <select name="filterlist" form="filterform">
          <option value="1">Filters</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    );
  }
}

export default Footer;
