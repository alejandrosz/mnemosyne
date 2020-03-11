import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Footer.scss";
import Slider from "./slider/Slider";
import MultipleSelect from "./multipleSelect/MultipleSelect";
// import { TextField } from "@material-ui/core";
import TextField from "./TextField/TextField";
import SendButton from "./sendButton/SendButton";
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

        <img className="mnemosine-logo" src="/images/logo-mnemosine.png"/>	
        {/* <h1 className="mnemosine-title">mnemosine</h1> */}
        <CheckboxesGroup></CheckboxesGroup>
        <TextField onKeyDown={e => this.props.searchMongo(e)}></TextField>
        <MultipleSelect></MultipleSelect>
        <Slider></Slider>
        <SendButton></SendButton>
      </div>
    );
  }
}

export default Footer;
