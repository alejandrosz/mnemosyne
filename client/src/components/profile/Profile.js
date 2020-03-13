import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Profile.scss";
import Axios from "axios";
import Collections from "../collection/Collections";
// import * as IndexService from "../../services/service";

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { profile: {} };
  // }
  state = { profile: {} };

  getProfile(user) {
    let useUser = user || this.props.user;
    if (useUser) {
      Axios.get(`${process.env.REACT_APP_API_URL}/profile/${useUser._id}`).then(
        gotUser => {
          this.setUserProfile(gotUser.data);
        }
      );
    }
  }

  setUserProfile(userData) {
    this.setState({ ...this.state, profile: userData });

  }

  componentWillReceiveProps(next) {
    this.getProfile(next.user);
  }

  componentDidMount() {
    this.getProfile(this.props.user);
  }

  render() {
    const { profile } = this.state;
 

    if (this.props.user) {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <div className="Profile-name">
              {" "}
              <h1>Profile of {this.props.user.username}</h1>
              <button onClick={this.props.history.goBack}>Close</button>

            </div>
            <div>
              {profile && profile.collections && (
                <Collections
                  user={this.props.user}
                  collections={profile.collections}
                  reFetch={() => this.getProfile()}
                ></Collections>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>Profile of </h1>
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          
          <div className="Profile-body"></div>
        </div>
      );
    }
  }
}

export default withRouter(Profile);
