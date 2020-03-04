import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detail.scss";

class Detail extends Component {
  render() {
    return (
      <div className="Detail-style">
        <h1>soy el detalle</h1>
        <Link to="/">
          <h1>X</h1>
        </Link>
      </div>
    );
  }
}

export default Detail;
