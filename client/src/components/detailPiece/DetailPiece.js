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
    let {
      origin,
      technic,
      tags,
      museum,
      name,
      imageUrl,
      description,
      author,
      year,
      culture,
      classification,
      rating,
      department
    } = this.state.piece;
    console.log("piece id", this.state.piece._id);

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
          <img src={imageUrl} alt="image" />
          <h1>&hearts;{rating}</h1>{" "}
          {this.state.isSaved ? <h1> saved</h1> : <h1>not saved</h1>}
          <button onClick={this.addLike}>like</button>
          {/* {this.state &&
          this.state.user &&
          this.state.user.collections &&
          this.state.user.collections.some(collection =>
            collection.pieces.find(this.state.piece._id) */}
          {this.state &&
          this.state.user &&
          this.state.user.collections &&
          this.state.user.collections.some(collection =>
            collection.pieces
              .map(piece => piece._id)
              .find(id => id === this.state.piece._id)
          ) ? (
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
          ) : (
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
          )}
          <div className="detail-text">
            {" "}
            {<h1>{name}</h1>}
            {author && <p>author {author}</p>}
            {year && <p>year {year}</p>}
            {museum === "RMA" ? (
              <p>Rijksmuseum of Amsterdam</p>
            ) : museum === "MOMA" ? (
              <p>MoMA New York</p>
            ) : (
              <p>Metropolitan Museum of Art</p>
            )}
            {technic && <p>technic {technic}</p>}
            {origin && (
              <p>
                origin
                {origin && <p>{origin[0]}</p>}
              </p>
            )}
            {tags && (
              <p>
                tags
                {tags && tags.map(tag => <p>{tag}</p>)}
              </p>
            )}
            {description && <p>description{description}</p>}
            {culture && <p>culture{culture}</p>}
            {classification && <p>classification{classification}</p>}
            {department && <p>department{department}</p>}
          </div>
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
