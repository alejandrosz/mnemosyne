import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Footer.scss";
// import { Slider } from "@material-ui/core";
// import noUiSlider from "noUiSlider"
// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";
import Slider from "./slider/Slider";
import MultipleSelect from "./multipleSelect/MultipleSelect";
// import { TextField } from "@material-ui/core";
import TextField from "./TextField/TextField";
import SendButton from "./sendButton/SendButton";
import CheckboxLabels from "./CheckboxLabels/CheckboxLabels";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      isSignup: false,
      tags: [],
      textFieldValue: ""
    };
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
  //   getInitialState: function() {
  //     return {
  //         textFieldValue: ''
  //     };
  // },

  // _handleTextFieldChange(e) {
  //   console.log(e)
  //     this.setState({
  //         textFieldValue: e.target.value
  //     });
  // }

  // onSaveUser = () => {
  //   console.log('Saving user');
  //   console.log(this.myRefs.username.value);
  // }

  render() {
    return (
      <div className="footer-style">
        <input
          className="search-bar"
          type="text"
          onKeyDown={e => this.props.searchMongo(e)}
          placeholder="search"
        ></input>
        {/* <CheckboxLabels></CheckboxLabels> */}
        <TextField
          // value={this.state.textFieldValue}
          inputRef={c => {
            this.myRefs.username = c;
          }}
          onChange={this.onSaveUser}
        ></TextField>
        <MultipleSelect></MultipleSelect>
        <Slider></Slider>
        <SendButton></SendButton>
        {/* <Select></Select> */}
        {/* <div> <select className="custom-select" form="filterform">
          <option value="1">Filters</option>
          <option value="1">Filters</option>
          <option value="1">Filters</option>

        
        </select></div> */}
        {/* const Slider = () => (
        <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
        ); */}
        {/* <input id="slider1" type="range" min="0" max="2000" step="1"></input> */}
      </div>
    );
  }
}

export default Footer;
