import React, { Component } from "react";
import "./DetailPiece.scss";
import { Link, useRouteMatch } from "react-router-dom";

import Axios from "axios";

// import { useRouteMatch } from "react-router-dom";

// function BlogPost() {

//   // Do whatever you want with the match...
//   return <div />;
// }

class DetailPiece extends Component {
  constructor(props) {
    super(props);
    this.state = { piece: {}, user: {}, isSaved: false };
    this.addLike = this.addLike.bind(this);
  }

  getProfile(user) {
    console.log("callingrefetchprofile", user, this.props.user);
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
    this.setState({ ...this.state, user: userData });
    console.log(
      "collections from back",
      userData && userData.collections && userData.collections.length
    );
  }

  componentWillReceiveProps(next) {
    this.getProfile(next.user);
  }

  componentDidMount() {
    this.getProfile(this.props.user);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/piece/${this.props.match.params.id}`
    ).then(pieceFound => {
      this.setState({ ...this.state, piece: pieceFound.data });
      console.log("state", this.state);
    });
  }

  // componentDidMount() {
  //   console.log("props", this.props.match.params.id);
  //   Axios.get(
  //     `${process.env.REACT_APP_API_URL}/piece/${this.props.match.params.id}`
  //   ).then(pieceFound => {
  //     this.setState({ ...this.state, piece: pieceFound.data });
  //     console.log("state", this.state);
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("nextprops", nextProps);
  //   Axios.get(
  //     `${process.env.REACT_APP_API_URL}/profile/${nextProps.user._id}`
  //   ).then(userFound => {
  //     this.setState({ ...this.state, user: userFound.data });
  //     console.log("state", this.state);
  //   });
  // }

  addLike() {
    console.log("like", this.state);
    Axios.put(
      `${process.env.REACT_APP_API_URL}/piece/like/${this.state.piece._id}`
    ).then(pieceLiked => {
      console.log("pieceLiked", pieceLiked.data);
      this.setState({ piece: pieceLiked.data });
    });
  }
  // /collection/add/:collectionId&:pieceId
  addCollection(collectionId) {
    console.log("collectionId", collectionId, "pieceid", this.state.piece._id);
    Axios.put(
      `${process.env.REACT_APP_API_URL}/collection/add/${collectionId}&${this.state.piece._id}`
    ).then(pieceAdded => {
      console.log("pieceAdded", pieceAdded.data);
      this.setState({ isSaved: !this.state.isSaved });
    });
  }

  deleteCollection(collectionId) {
    console.log("collectionId", collectionId, "pieceid", this.state.piece._id);
    Axios.put(
      `${process.env.REACT_APP_API_URL}/collection/del/${collectionId}&${this.state.piece._id}`
    ).then(pieceDeleted => {
      console.log("pieceDeleted", pieceDeleted.data);
      this.setState({ isSaved: !this.state.isSaved });
    });
  }

  render() {
    console.log("props user", this.props.user);
    console.log("image", this.state.piece.imageUrl);

    return (
      <div className="detailPiece">
        <div className="detail-card">
          {" "}
          <div className="detail-top">
            {" "}
            <h1>Detail view</h1>
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          <img src={this.state.piece.imageUrl} alt="image" />
          <h1>&hearts;{this.state.piece.rating}</h1>
          <p>{this.state.piece.name}</p>
          <p>
            {this.state.piece.author} {this.state.piece.year}
          </p>
          <p>{this.state.piece.museum}</p>
          <button onClick={this.addLike}>like</button>
          {this.state.isSaved ? <h1> saved</h1> : <h1>not saved</h1>}
          {/* {this.state &&
          this.state.user &&
          this.state.user.collections &&
          this.state.user.collections.some(collection =>
            collection.pieces.find(this.state.piece._id)
          ) ? ( */}
          <div class="dropdown">
            <button class="dropbtn">Delete</button>
            <div class="dropdown-content">
              {this.state &&
                this.state.user &&
                this.state.user.collections &&
                this.state.user.collections.map(collection => (
                  <button
                    onClick={() => this.deleteCollection(collection._id)}
                    class="droppedbtn"
                  >
                    {collection.name}
                  </button>
                ))}
            </div>
          </div>
          {/* ) : ( */}
          <div class="dropdown">
            <button class="dropbtn">Add</button>
            <div class="dropdown-content">
              {this.state &&
                this.state.user &&
                this.state.user.collections &&
                this.state.user.collections.map(collection => (
                  <button
                    onClick={() => this.addCollection(collection._id)}
                    class="droppedbtn"
                  >
                    {collection.name}
                  </button>
                ))}
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default DetailPiece;

// Axios.get(`${process.env.REACT_APP_API_URL}/profile/${useUser._id}`).then(
//   gotUser => {
//     this.setUserProfile(gotUser.data);
//   }
// );
