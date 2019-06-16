import React, { Component } from "react";

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lat, lng, name } = this.props;
    return <div lat={lat} lng={lng} name={name} />;
  }
}
