import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";
import Axios from "axios";
// import * as IndexService from "../../services/service";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {} };
  }

  componentWillReceiveProps(next) {
    Axios.get(`http://localhost:3010/api/profile/${next.user._id}`).then(
      user => {
        this.setState({ ...this.state, profile: user.data });
      }
    );
  }

  // getUser = userObj => {
  //   this.setState({
  //     loggedInUser: userObj
  //   });
  // };

  render() {
    const { profile } = this.state;
    console.log("user", this.state.profile);
    if (this.props.user) {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>perfil de {this.props.user.username}</h1>
            {profile &&
              profile.collections &&
              profile.collections.map(collection => (
                <div>{collection.name}</div>
              ))}
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
