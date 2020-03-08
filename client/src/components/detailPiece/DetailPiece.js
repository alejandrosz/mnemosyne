import React, { Component } from "react";
import "./DetailPiece.scss";
import { Link } from "react-router-dom";

import Axios from "axios";

class DetailPiece extends Component {
  state = { piece: {} };

  // componentDidMount() {
  //   Axios.get(
  //     `${process.env.REACT_APP_API_URL}/detail/${this.props.match.params.id}`
  //   ).then(pieceFound => {
  //     this.setState({ piece: pieceFound });
  //   });
  // }

  render() {
    return (
      <div className="detailPiece">
        <div>
          {" "}
          <h1>hola soy el detalle</h1>
          <Link to="/">
            <h1>X</h1>
          </Link>
          <button>like</button>
          <button>add</button>
          <button>delete</button>
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
