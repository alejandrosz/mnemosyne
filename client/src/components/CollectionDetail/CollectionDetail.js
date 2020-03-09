import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CollectionDetail.scss";
import Axios from "axios";
import D3Test2 from "../../components/D3Test/D3Test2";

class CollectionDetail extends Component {
  state = {
    // name: "Identity",
    data: {
      children: [
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 5", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 5", value: "cgi-2.jpg" }
      ]
    }
  };

  render() {
    return (
      <div className="CollectionDetail-style">
        {" "}
        <div className="CollectionDetail-top">
          {" "}
          <h1>Detalle de coleccion</h1>
          <Link to="/profile">
            <h1>X</h1>
          </Link>
          <div id="treemap-detail">
            <D3Test2 data={this.state.data}></D3Test2>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionDetail;
