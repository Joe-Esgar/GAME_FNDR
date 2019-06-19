import React, { Component } from "react";

export default class SelectedDungeon extends Component {
  constructor(props) {
    super(props);
  }

  formatDate = string => {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric"
    };
    return new Date(string).toLocaleDateString([], options);
  };

  render() {
    return (
      <div>
        <h2>{this.formatDate(this.props.time_entered)}</h2>
        <h2>{this.props.username}</h2>
        <h2>{this.props.charName}</h2>
        <p>{this.props.content}</p>
      </div>
    );
  }
}
