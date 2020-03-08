import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Footer.scss";
// import { Slider } from "@material-ui/core";
// import noUiSlider from "noUiSlider"
// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";
import Slider from "../slider/Slider";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, isSignup: false, tags: [] };
  }

  // componentWillReceiveProps() {
  //   this.getTags();
  // }

  // getTags() {
  //   console.log("tags", this.props.tags)
  //   const tags = [];
  //   this.props.tags.forEach(function(item) {
  //     item.tags.forEach(function(tag) {
  //       tags.push(tag.term);
  //     });
  //   });
  //   const uniqueTags = [...new Set(tags)];
  //   this.setState({ ...this.state, tags: uniqueTags });
  // }

  render() {
    return (
      <div className="footer-style">
        <input className="search-bar"
          type="text"
          onKeyDown={e => this.props.searchMongo(e)}
          placeholder="search"
        ></input>
        <select name="filterlist" form="filterform">
          <option value="1">Filters</option>
          {/* {this.state.tags.map(tag => (
            <option value={tag}>{tag}</option>
          ))} */}
        </select>
        {/* const Slider = () => (
        <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
        ); */}
        <input id="slider1" type="range" min="0" max="2000" step="1"></input>
        <Slider></Slider>
      </div>
    );

    // let slider = document.getElementById("slider1");

    // noUiSlider.create(slider, {
    //   start: [20, 80],
    //   connect: true,
    //   range: {
    //     min: 0,
    //     max: 100
    //   }
    // });
  }
}

export default Footer;
