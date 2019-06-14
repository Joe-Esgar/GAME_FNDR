import React, { Component } from "react";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.makeMap(this.props.searchResults);
  }
  // get an array of arrays where the values are name, lat and lng
  //   element.name, element.location.lat, element.location.lng

  makeMap = arr => {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      newArray.push([
        arr[i].name,
        arr[i].geometry.location.lat,
        arr[i].geometry.location.lng
      ]);
    }
    this.setState({
      array: newArray
    });
  };

  // 0:
  // geometry:
  // location: {lat: 33.4371136, lng: -111.9257536}
  // viewport: {northeast: {…}, southwest: {…}}
  // __proto__: Object
  // icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png"
  // id: "7b5ca1613a4e3a81b807e8d8e4dbb81c3300360f"

  render() {
    console.log("KILL ME PLEASE GOD", this.state.array);
    return (
      <div className="mapContainer">
        <div id="map" />
      </div>
    );
  }
}
