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
  state = { piece: {} };

  componentDidMount() {
    // let match = useRouteMatch("/blog/:slug");
    // console.log(match);
    console.log("props", this.props);
    Axios
      .get
      // `${process.env.REACT_APP_API_URL}/detail/${this.props.match.params.id}`
      ()
      .then(pieceFound => {
        console.log("piecefound", pieceFound);
        this.setState({ piece: pieceFound });
      });
  }

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
