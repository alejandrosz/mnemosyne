import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    console.log("callingrefetchprofile", user);
    let useUser = user || this.props.user;
    if (useUser) {
      Axios.get(`${process.env.REACT_APP_API_URL}/profile/${useUser._id}`).then(
        gotUser => {
          this.setState({ ...this.state, profile: gotUser.data });
        }
      );
    }
  }

  componentWillReceiveProps(next) {
    this.getProfile(next.user);
  }

  componentDidMount() {
    this.getProfile(this.props.user);
  }

  render() {
    const { profile } = this.state;
    console.log("user", this.props.user);

    if (this.props.user) {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>perfil de {this.props.user.username}</h1>
            {profile && profile.collections && (
              <Collections
                user={this.props.user}
                collections={profile.collections}
                reFetch={() => this.getProfile()}
              ></Collections>
            )}
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          <div className="Profile-body">
            <p>texto dentro del perfil de {this.props.user.username}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>perfil de </h1>
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          <div className="Profile-body">
            <p>texto dentro del perfil de </p>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
