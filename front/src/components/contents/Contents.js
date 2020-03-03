import React, { Component } from "react";
import Container from "../Container";

class Contents extends Component {
  state = {
    resultsId: [],
    resultsDetail: []
  };

  render() {
    const style = { width: "100vw", height: "78vh", backgroundColor: "black" };
    // const imgArray = new Array(50).fill(
    //   "https://axiomoptics.com/wp-content/uploads/2019/08/placeholder-images-image_large.png"
    // );
    const imgArray = this.props.query.map(elem => elem.primaryImageSmall);
    console.log(imgArray);
    return (
      <div style={style}>
        <Container renderMore={8} imgArray={imgArray} />
      </div>
    );
  }
}

export default Contents;
