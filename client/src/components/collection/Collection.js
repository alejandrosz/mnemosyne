import React, { Component } from "react";
import "./Collection.scss";
import Axios from "axios";

class Collection extends Component {
  // constructor(props) {}
  deleteCollection() {
    console.log("delete", this.props.collection._id);
    console.log(this.props);
    Axios.delete(
      `${process.env.REACT_APP_API_URL}/collection/${this.props.collection._id}`
    ).then(() => {
      console.log("callingrefetchcollection",this.props.reFetch)
      if (this.props.reFetch) {
        this.props.reFetch();
      }
    });
  }

  render() {
    console.log(this.props.collection);
    return (
      <div>
        <h1>{this.props.collection.name}</h1>
        <button onClick={() => this.deleteCollection()}>delete</button>
      </div>
    );
  }
}

export default Collection;
