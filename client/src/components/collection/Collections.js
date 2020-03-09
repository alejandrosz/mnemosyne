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
      this.sendName();
    }
  }

  sendName() {
    Axios.post(
      `${process.env.REACT_APP_API_URL}/collection/${this.props.user._id}`,
      {
        name: this.state.newCollection
      }
    ).then((updatedUser) => this.props.reFetch(updatedUser.data));
  }

  render() {
    console.log("num collections", this.props.collections.length);
    return (
      <div className="collections-style">
        <div className="add-field">
          <input
            type="text"
            placeholder="create new collection"
            id="create-collection"
            value={this.state.newCollection}
            onChange={e => this.updateNewCollection(e)}
            onKeyDown={e => this.checkEnter(e)}
          />
          <button onClick={() => this.sendName()}>add</button>
        </div>
        {this.props.collections.map(collection => (
          <Collection
            collection={collection}
            reFetch={this.props.reFetch}
          ></Collection>
        ))}
      </div>
    );
  }
}

export default Collections;
