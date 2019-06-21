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
      <div className="boardDisplay">
        <div className="postInfo">
          <h5>Posted:</h5>
          <h2>{this.formatDate(this.props.time_entered)}</h2>
          <h5>User:</h5>
          <h2>{this.props.username}</h2>
          <h5>Character:</h5>
          <h2>{this.props.charName}</h2>
        </div>
        <div className="PostContent">
          <h5>Content:</h5>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
