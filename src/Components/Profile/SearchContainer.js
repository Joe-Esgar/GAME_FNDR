import axios from "axios";
import React, { Component, Fragment } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import "./profile.css";
import StoreList from "./StoreList";
import FullList from "./FullList";
import logo from "../Landing/logo2.png";
import ogreJosh from "./ogreJosh.png";
import DungeonList from "./DungeonList";
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
      center: {},
      listName: "",
      mapName: "",
      hover: false,
      toggle: false,
      id: 0,
      secondToggle: false,
      image: logo
    };
  }

  mapOnClick = id => {
    const found = this.state.places.filter((element, index) => {
      return element.id == id;
    });
    console.log(found);
    if (found.length) {
      this.setState({
        id: found[0].id
      });
    }
  };

  //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/geocode/json?address=101+Dupont+Circle,+Phoenix,+AZ&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc

  makeMap = arr => {
    const newArray = [];
    const regex = /gamestop/gi;
    for (let i = 0; i < arr.length; i++) {
      if (regex.test(arr[i].name) === false) {
        newArray.push({
          name: arr[i].name,
          lat: arr[i].geometry.location.lat,
          lng: arr[i].geometry.location.lng,
          address: arr[i].vicinity,
          id: arr[i].place_id
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
    }
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
      })
      .then(() => this.postMe(this.state.lat, this.state.lon));
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
    this.setState({
      [prop]: value
    });
  };

  killTheOgreJosh = () => {
    this.setState({
      image: logo
    });
    return alert("MISSLES LAUNCHED! HOLD ON TO YOUR TEETH!");
  };

  render() {
    const {
      myAddress,
      searchResults,
      toggle,
      lat,
      lon,
      places,
      secondToggle
    } = this.state;
    const fullList = places.map((store, index) => {
      return <FullList key={index} name={store.name} address={store.address} />;
    });
    const mappedStores = places.filter((store, index) => {
      console.log(this.state.id, store.id);
      return this.state.id === store.id;
    });
    const filteredStores = mappedStores.map((store, index) => {
      return (
        <StoreList key={index} name={store.name} address={store.address} />
      );
    });
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
                    key={place.index}
                    text={place.name}
                    lat={place.lat}
                    lng={place.lng}
                    mapOnClick={this.mapOnClick}
                    id={place.id}
                    image={this.state.image}
                  />
                ))}
              </GoogleMapReact>
            </Fragment>
          </div>
        ) : (
          <div />
        )}
        {toggle ? (
          <div className="InfoBoxContainer">
            <h4>Click a location to view info!</h4>
            <div>{filteredStores}</div>
            {!secondToggle ? (
              <button onClick={() => this.setState({ secondToggle: true })}>
                Show All
              </button>
            ) : (
              <button onClick={() => this.setState({ secondToggle: false })}>
                Hide All
              </button>
            )}
            {this.state.image === logo ? (
              <button onClick={() => this.setState({ image: ogreJosh })}>
                Fun Mode
              </button>
            ) : (
              <button onClick={() => this.killTheOgreJosh()}>
                {" "}
                Slay the ogreJosh
              </button>
            )}
            {secondToggle ? <div>{fullList}</div> : null}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
