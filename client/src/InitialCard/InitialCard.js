import React, { Component } from "react";
import "./InitialCard.scss";
class InitialCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="initialcard">
        <button onClick={this.props.closeInitialCard}>&#8213;</button>
        <p>
          <span className="bold-text">mnemosine</span> is a tool for browsing
          media databases{" "}
        </p>
        <br />
        <p>
          At the beggining, a random sample of the archive from the Metropolitan
          Museum of Art, Museum of Modern Art and Rijksmuseum of Amsterdam are
          showed. In total there are more than 1.230.000 pieces of art reachable
          through their APIs and databases.
        </p>
        <br />
        <p>
          You can use the search bar in combination with the selector of tags
          and the range of years to find more results according to your
          interests.
        </p>
        <br />
        <ul className="important-text">
          <li className="important-text">
            The results are nested in 5 levels:
          </li>
          <li>
            <span className="bold-text">1</span> Database to which they belong
          </li>
          <li>
            <span className="bold-text">2</span> Year of creation
          </li>
          <li>
            <span className="bold-text">3</span> Geographical origin
          </li>
          <li>
            <span className="bold-text">4</span> Author
          </li>
          <li>
            <span className="bold-text">5</span> Single piece
          </li>
        </ul>
        <br />
        <p>
          In the last level, you can open a new tab and get full info of the
          piece.
        </p>
        <br />
        <p>
          You can like any item! They are showed bigger when they gain likes.
        </p>
        <br />
        <p className="important-text">
          Sign up and create your own collections adding pieces to them.
        </p>

        <br />
        <p>
          The aim of the project is make possible connect more and more media
          databases.
        </p>
      </div>
    );
  }
}

export default InitialCard;
