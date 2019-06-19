import React, { Component } from "react";
import axios from "axios";

export default class SelectedDungeon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{this.props.username}</h2>
        <h2>{this.props.charName}</h2>
        <p>{this.props.content}</p>
      </div>
    );
  }
}
