import React, { Component } from "react";
import "./InitialCard.scss";
class InitialCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="initialcard">
        hola <button onClick={this.props.closeInitialCard}>Close</button>
      </div>
    );
  }
}

export default InitialCard;
