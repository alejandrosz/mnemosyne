import React, { Component } from "react";
import "./DetailPiece.scss";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import Axios from "axios";

class DetailPiece extends Component {
  constructor(props) {
    super(props);
    this.state = { piece: {}, user: {}, isSaved: false, imageClass: "" };
    this.addLike = this.addLike.bind(this);
  }

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
    let isSaved =
      userData.collections &&
      userData.collections.some(collection =>
        collection.pieces.find(
          piece => piece._id === this.props.match.params.id
        )
      );

    this.setState({ ...this.state, user: userData, isSaved });
  }

  componentWillReceiveProps(next) {
    this.getProfile(next.user);
  }

  componentDidMount() {
    this.getProfile(this.props.user);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/piece/${this.props.match.params.id}`
    ).then(pieceFound => {
      let aspectRatio = "";
      var img = new Image();
      img.src = pieceFound.data.imageUrl;
      img.onload = () => {
        let height = img.height;
        let width = img.width;
        let relation = height / width;
        if (relation > 0.9 && relation < 1.1) {
          aspectRatio = "square-img";
        } else if (relation >= 1.1) {
          aspectRatio = "vertical-img";
        } else if (relation <= 0.9) {
          aspectRatio = "horizontal-img";
        }

        this.setState({
          ...this.state,
          piece: pieceFound.data,
          imageClass: aspectRatio
        });
      };

      console.log("state", this.state);
    });
  }

  addLike() {
    Axios.put(
      `${process.env.REACT_APP_API_URL}/piece/like/${this.state.piece._id}`
    ).then(pieceLiked => {
      this.setState({ piece: pieceLiked.data });
    });
  }
  addCollection(collectionId) {
    Axios.put(
      `${process.env.REACT_APP_API_URL}/collection/add/${collectionId}&${this.state.piece._id}`
    ).then(pieceAdded => {
      console.log("pieceAdded", pieceAdded.data);
      this.getProfile(this.state.user);
    });
  }

  deleteCollection(collectionId) {
    Axios.put(
      `${process.env.REACT_APP_API_URL}/collection/del/${collectionId}&${this.state.piece._id}`
    ).then(pieceDeleted => {
      console.log("pieceDeleted", pieceDeleted.data);
      this.getProfile(this.state.user);
    });
  }

  render() {
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

    return (
      <div className="detailPiece">
        <div className="detail-card">
          <div className="detail-top">
            <h1>Detail view</h1>
            <button onClick={this.props.history.goBack}>Close</button>
          </div>
          <div className="image-container">
            <img className={this.state.imageClass} src={imageUrl} />
          </div>
          <div className="detail-buttons">
            <h1>&hearts;{rating}</h1>
            {/* {this.state.isSaved ? <h1> saved</h1> : <h1>not saved</h1>} */}
            <button onClick={this.addLike}>like</button>
            <div class="dropdown">
              <button class="dropbtn">Add</button>
              <div class="dropdown-content">
                {this.state &&
                  this.state.user &&
                  this.state.user.collections &&
                  this.state.user.collections
                    .filter(collection =>
                      collection.pieces.every(
                        p => p._id !== this.props.match.params.id
                      )
                    )
                    .map(collection => (
                      <button
                        onClick={() => this.addCollection(collection._id)}
                        class="droppedbtn"
                      >
                        {collection.name}
                      </button>
                    ))}
              </div>
            </div>
            {this.state.isSaved && (
              <div class="dropdown">
                <button class="dropbtn">Delete</button>
                <div class="dropdown-content">
                  {this.state &&
                    this.state.user &&
                    this.state.user.collections &&
                    this.state.user.collections
                      .filter(collection =>
                        collection.pieces.some(
                          p => p._id === this.props.match.params.id
                        )
                      )
                      .map(collection => (
                        <button
                          onClick={() => this.deleteCollection(collection._id)}
                          class="droppedbtn"
                        >
                          {collection.name}
                        </button>
                      ))}
                </div>
              </div>
            )}
          </div>
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

export default withRouter(DetailPiece);
