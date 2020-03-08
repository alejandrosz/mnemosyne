import React, { Component } from "react";
import "./Collections.scss";
import Collection from "./Collection";
import Axios from "axios";

class Collections extends Component {
  // constructor(props) {}
  state = { newCollection: "" };

  updateNewCollection(e) {
    this.setState({
      ...this.state,
      newCollection: e.target.value
    });
  }

  checkEnter(e) {
    if (e.keyCode === 13) {
      Axios.post(
        `${process.env.REACT_APP_API_URL}/collection/${this.props.user._id}`,
        {
          name: this.state.newCollection
        }
      ).then(() => this.props.reFetch());
    }
  }

  render() {
    console.log("collections", this.props.reFetch);
    return (
      <div className="collections-style">
        {this.props.collections.map(collection => (
          <Collection
            collection={collection}
            reFetch={this.props.reFetch}
          ></Collection>
        ))}
        <input
          type="text"
          placeholder="create new collection"
          id="create-collection"
          value={this.state.newCollection}
          onChange={e => this.updateNewCollection(e)}
          onKeyDown={e => this.checkEnter(e)}
        />
      </div>
    );
  }
}

export default Collections;
