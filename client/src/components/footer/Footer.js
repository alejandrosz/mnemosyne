import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Footer.scss";
import Slider from "./slider/Slider";
import MultipleSelect from "./multipleSelect/MultipleSelect";
// import { TextField } from "@material-ui/core";
import TextField from "./TextField/TextField";
import UploadButtons from "./sendButton/UploadButtons";
import CheckboxesGroup from "./CheckboxesGroup/CheckboxesGroup";
// import logo-mnemosine from "../../../public/images/logo-mnemosine";

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

  render() {
    return (
      <div className="footer-style">
        {/* <image url("")/> */}
        {/* <img src={logo-mnemosine} alt="logo"/> */}

        <img className="mnemosine-logo" src="/images/logo-mnemosine.png" />
        {/* <h1 className="mnemosine-title">mnemosine</h1> */}
        <CheckboxesGroup></CheckboxesGroup>
        <TextField
          onChange={e => this.props.saveSearch(e)}
          onKeyDown={e => this.props.searchMongo(e)}
        ></TextField>
        <MultipleSelect
          onSelectTag={e => this.props.multipleSelectResult(e)}
        ></MultipleSelect>
        <Slider changeRange={e => this.props.sliderResult(e)}></Slider>
        <UploadButtons sendResults={this.props.sendResults}></UploadButtons>
      </div>
    );
  }
}

export default Footer;
