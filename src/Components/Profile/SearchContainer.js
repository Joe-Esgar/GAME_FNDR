import axios from "axios";
import React, { Component } from "react";
import Map from "./Map";

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAddress: "",
      geoData: "",
      lat: 0,
      lon: 0,
      name: "",
      searchResults: [],
      toggle: false
    };
  }

  //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/geocode/json?address=101+Dupont+Circle,+Phoenix,+AZ&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc

  getGeoData = myAddress => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then(res => {
        this.setState({
          geoData: res.data,
          lat: res.data.results[0].geometry.location.lat,
          lon: res.data.results[0].geometry.location.lng
        });
      })
      .then(() => this.postMe(this.state.lat, this.state.lon));
  };

  postMe = (lat, lon) => {
    axios.post("/api/fail", { lat, lon }).then(res => {
      this.setState({
        searchResults: res.data.results,
        toggle: true
      });
    });
  };

  universalChangeHandler = (prop, value) => {
    console.log("Prop:", prop, "value:", value);
    this.setState({
      [prop]: value
    });
  };

  render() {
    const { myAddress, searchResults, toggle, lat, lon } = this.state;
    console.log(searchResults);
    return (
      <div className="SearchBox">
        <h2>Address example: 101 Dupont Circle Phoenix AZ</h2>
        <input
          onChange={e =>
            this.universalChangeHandler(e.target.name, e.target.value)
          }
          value={myAddress}
          name="myAddress"
        />
        <button onClick={() => this.getGeoData(myAddress)}>Search</button>
        {toggle ? (
          <Map searchResults={searchResults} lat={lat} lon={lon} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}
