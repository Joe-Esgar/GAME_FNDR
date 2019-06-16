import axios from "axios";
import React, { Component, Fragment } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import "./profile.css";
// import isEmpty from "lodash.isempty";

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.lat, place.lng));
  });
  return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  console.log("Loaded api");
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

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
      toggle: false,
      places: [],
      refresh: true,
      center: {}
    };
  }

  //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/geocode/json?address=101+Dupont+Circle,+Phoenix,+AZ&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc

  makeMap = arr => {
    console.log("make map", "arr:", arr);
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      //   console.log(arr[i]);
      newArray.push({
        name: arr[i].name,
        lat: arr[i].geometry.location.lat,
        lng: arr[i].geometry.location.lng
      });
    }
    this.setState({
      places: newArray,
      toggle: true,
      center: {
        lat: this.state.lat,
        lng: this.state.lon
      }
    });

    // console.log("make map state:", this.state);
  };

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
        // console.log(
        //   "GET GEODATA RAN",
        //   "res.data:",
        //   res.data,
        //   "state:",
        //   this.state
        // );
      })
      .then(() => this.postMe(this.state.lat, this.state.lon));
    //   .then(() => this.makeMap(this.state.searchResults));
  };

  postMe = (lat, lon) => {
    axios.post("/api/fail", { lat, lon }).then(res => {
      this.setState({
        searchResults: res.data.results
      });
      console.log("Search Results", this.state.searchResults);
      this.makeMap(this.state.searchResults);
    });
  };

  universalChangeHandler = (prop, value) => {
    // console.log("Prop:", prop, "value:", value);
    this.setState({
      [prop]: value
    });
  };

  render() {
    const { myAddress, searchResults, toggle, lat, lon, places } = this.state;
    console.log("lat:", lat, "lon", lon, "places", places);
    return (
      <div className="SearchBox">
        <h2>Address example: 111 Dupont Circle Phoenix AZ</h2>
        <input
          onChange={e =>
            this.universalChangeHandler(e.target.name, e.target.value)
          }
          value={myAddress}
          name="myAddress"
        />
        <button onClick={() => this.getGeoData(myAddress)}>Search</button>
        {/* <button onClick={() => this.setState({ refresh: false })}>
          Refresh
        </button> */}
        {toggle ? (
          <div id="map">
            <Fragment>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                defaultZoom={10}
                center={this.state.center}
                yesIWantToUseGoogleMapApiInternals={true}
              >
                {places.map((place, index) => (
                  <Marker
                    key={index}
                    id={place.id}
                    text={place.name}
                    lat={place.lat}
                    lng={place.lng}
                  />
                ))}
              </GoogleMapReact>
            </Fragment>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
