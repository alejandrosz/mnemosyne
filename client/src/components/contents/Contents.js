import React, { Component } from "react";
import Container from "../Container";
import "./Contents.scss";

class Contents extends Component {
  state = {
    resultsId: [],
    resultsDetail: []
  };

  render() {
    const style = { width: "100vw", height: "78vh", backgroundColor: "black" };
    const imgArray = this.props.query.map(elem => elem.primaryImageSmall);
    let renderTimes = Math.ceil(this.props.query.length/6)
    console.log(imgArray);
    return (
      <div style={style}>
        {/* <Container renderMore={renderTimes} imgArray={imgArray} /> */}
        <Container renderMore={renderTimes} imgArray={imgArray} />

      </div>
    );
  }
}

export default Contents;
