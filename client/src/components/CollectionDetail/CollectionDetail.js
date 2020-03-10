import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./CollectionDetail.scss";
import Axios from "axios";
import D3Test2small from "../../components/D3Test/D3Test2small";
import { nestByMuseum } from "../../nestData";

class CollectionDetail extends Component {
  state = {
    collection: {},
    treeData: {},
    data: {
      children: [
        { name: "Photo 1", value: "cgi-1.jpg" },
        { name: "Photo 1", value: "cgi-1.jpg" },
      ]
    }
  };

  componentWillMount() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/collection/${this.props.match.params.id}`
    ).then(collectionFound => {
      const treeCollection = nestByMuseum(collectionFound.data.pieces);
      this.setState({
        ...this.state,
        collection: collectionFound.data,
        treeData: treeCollection
      });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="CollectionDetail-style">
        <div className="CollectionDetail-top">
          <div className="CollectionDetail-buttons">
            <h1>{this.state.collection.name}</h1>
            <button onClick={this.props.history.goBack}>Close</button>
          </div>
          <div>
            <D3Test2small data={this.state.treeData}></D3Test2small>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CollectionDetail);
