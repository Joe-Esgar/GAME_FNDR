import React, { Component } from "react";
import "./Marker.scss";

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lat, lng, name } = this.props;
    console.log("HERE", lat, lng, name);
    return <div className="points" lat={lat} lng={lng} />;
  }
}
