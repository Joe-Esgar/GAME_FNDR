import React, { Component } from "react";
import "./FullList.scss";

export default class FullList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, address } = this.props;
    console.log(name);
    return (
      <div className="fulllist">
        {name} {address}
      </div>
    );
  }
}
