import React, { Component } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { set_Username, set_Profile_Pic } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { setCharacters } from "../../ducks/characterReducer";
import Characters from "./Characters";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profile_pic: "",
      id: 0,
      myCharacters: [],
      myToggle: false,
      character_name: "",
      character_class: "",
      description: "",
      bio: "",
      myOtherToggle: false,
      myAddress: "",
      geoData: "",
      lat: 0,
      lon: 0
    };
  }

  componentDidMount() {
    this.getFromDB();
  }

  //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/geocode/json?address=101+Dupont+Circle,+Phoenix,+AZ&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc

  getGeoData = myAddress => {
    console.log(myAddress, "YO THIS MY ADDRESS GOOGLE");
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc`
      )
      .then(res => {
        console.log(res.data, "FUCK IT");
        this.setState({
          geoData: res.data,
          lat: res.data.results[0].geometry.location.lat,
          lon: res.data.results[0].geometry.location.lng
        });
      })
      .then(() => this.postMe(this.state.lat, this.state.lon));
  };

  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.4483154197085,-111.9872909802915&radius=48280&type=gamestore&keyword=gamestore&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc

  // getPlace = (lat, lon) => {
  //   console.log(lat, lon, `We will Do it LIVE!`);

  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=48280&type=gamestore&keyword=gamestore&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc`
  //     )
  //     .then(res => {
  //       console.log(res.data);
  //     });
  // };

  getFromDB = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.props.set_Username(res.data.username);
        this.props.set_Profile_Pic(res.data.profile_pic);
        this.setState({
          id: res.data.user_id
        });
      })
      .then(() => this.getCharFromDb(this.state.id));
  };

  postMe = (lat, lon) => {
    axios.post("/api/fail", { lat, lon }).then(res => console.log(res.data));
  };

  getCharFromDb = id => {
    axios.get(`/api/char/${id}`).then(res => {
      this.props.setCharacters(res.data);
      this.setState({
        myCharacters: res.data
      });
    });
  };

  addChar = id => {
    const { character_name, character_class, bio, description } = this.state;
    if (!character_name || !character_class || !bio || !description) {
      return alert("Please fill all values");
    }
    axios
      .post(`/api/newChar/${id}`, {
        character_name,
        character_class,
        bio,
        description
      })
      .then(res => {
        this.props.setCharacters(res.data);
      })
      .then(this.getFromDB());
  };

  deleteChar = (chId, id) => {
    axios
      .delete(`/api/char?idToDelete=${chId}&oq=${id}`)
      .then(res => {
        this.props.setCharacters(res.data);
      })
      .then(this.getFromDB());
  };

  changeUserInfo = id => {
    const { username, profile_pic } = this.state;
    axios
      .put(`/api/user/${id}`, { username, profile_pic })
      .then(res => {})
      .catch(err => {
        return alert(err);
      });
  };

  universalChangeHandler = (prop, value) => {
    console.log("Prop:", prop, "value:", value);
    this.setState({
      [prop]: value
    });
  };

  render() {
    const {
      username,
      profile_pic,
      id,
      myCharacters,
      myToggle,
      character_class,
      description,
      character_name,
      bio,
      myOtherToggle,
      geoData,
      myAddress
    } = this.state;
    const mappedCharacters = myCharacters.map((element, index) => {
      return (
        <div key={index}>
          <div>
            <Characters
              chId={element.character_id}
              name={element.character_name}
              charClass={element.character_class}
              description={element.description}
              bio={element.bio}
              id={id}
              deleteChar={this.deleteChar}
              addChar={this.addChar}
            />{" "}
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="profileContainer">PROFILE</div>
        <Header />
        {myOtherToggle ? (
          <div className="changer">
            <div>
              Username:{" "}
              <input
                onChange={e =>
                  this.universalChangeHandler(e.target.name, e.target.value)
                }
                value={username}
                name="username"
              />
            </div>
            <div>
              Profile Picture:{" "}
              <input
                onChange={e =>
                  this.universalChangeHandler(e.target.name, e.target.value)
                }
                value={profile_pic}
                name="profile_pic"
              />
            </div>
            <button onClick={() => this.changeUserInfo(id)}>Submit</button>
            <button
              onClick={() => this.setState({ profile_pic: "", username: "" })}
            >
              Reset
            </button>
            <button onClick={() => this.setState({ myOtherToggle: false })}>
              Hide
            </button>
          </div>
        ) : (
          <button onClick={() => this.setState({ myOtherToggle: true })}>
            Edit Profile
          </button>
        )}
        {myToggle ? (
          <div className="charContainer">
            <div className="mappedCharacters">{mappedCharacters}</div>
            <button onClick={() => this.setState({ myToggle: false })}>
              Hide
            </button>
            <h2>Name</h2>
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={character_name}
              name="character_name"
            />
            <h2>Class</h2>
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={character_class}
              name="character_class"
            />
            <h2>Description</h2>
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={description}
              name="description"
            />
            <h2>Bio</h2>
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={bio}
              name="bio"
            />
            <button onClick={() => this.addChar(id)}>
              Create New Character
            </button>
            <button
              onClick={() =>
                this.setState({
                  character_name: "",
                  character_class: "",
                  description: "",
                  bio: ""
                })
              }
            >
              Reset
            </button>
          </div>
        ) : (
          <div>
            <h2>Characters</h2>
            <button onClick={() => this.setState({ myToggle: true })}>
              Show
            </button>
          </div>
        )}
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
        </div>
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  set_Username,
  set_Profile_Pic,
  setCharacters
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
