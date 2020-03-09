import React, { Component } from "react";
import "./Collection.scss";
import Axios from "axios";
import { Link } from "react-router-dom";

class Collection extends Component {
  // constructor(props) {}
  deleteCollection() {
    console.log("delete", this.props.collection._id);
    console.log(this.props);
    Axios.delete(
      `${process.env.REACT_APP_API_URL}/collection/${this.props.collection._id}`
    ).then(() => {
      console.log("callingrefetchcollection", this.props.reFetch);
      if (this.props.reFetch) {
        this.props.reFetch();
      }
    });
  }

  render() {
    return (
      <div className="collectionCard">
        <div className="collectionButtons">
          <h1>{this.props.collection.name}</h1>
          <button onClick={() => this.deleteCollection()}>delete</button>
        </div>
        <Link to={`/collection/${this.props.collection._id}`}>
          {" "}
          <div className="collectionImages">
            {this.props.collection.pieces.slice(0, 4).map(piece => (
              <div
                className="imageSquare"
                style={{ backgroundImage: `url(${piece.imageUrl})` }}
              ></div>
            ))}
          </div>
        </Link>
      </div>
    );
  }
}

export default Collection;
