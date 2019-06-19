import React, { Component } from "react";
import axios from "axios";
import Header from "../Header/Header";
import {
  set_Username,
  set_Profile_Pic,
  setUser
} from "../../ducks/userReducer";
import { connect } from "react-redux";
import { setCharacters } from "../../ducks/characterReducer";
import { setCurrentCharacter } from "../../ducks/currentCharacterReducer";
import Characters from "./Characters";
import SearchContainer from "./SearchContainer";
import "./profile.css";
import DungeonList from "./DungeonList";
import CharacterSelector from "./CharacterSelector";
import { setPosts } from "../../ducks/postReducer";
import { Redirect } from "react-router-dom";

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
      selectedCharacter: 0,
      rerender: false,
      dunId: 0,
      redirect: false
    };
  }

  getPosts = id => {
    axios.get(`/api/posts/${id}`).then(res => {
      this.props.setPosts(res.data);
      this.setState({
        posts: res.data
      });
    });
  };

  getIdOnClick = id => {
    console.log(id);
    this.setState({
      dunId: id
    });
    console.log(this.state.id);
    this.getPosts(this.state.dunId);
    this.setState({
      redirect: true
    });
  };


  componentDidMount() {
    this.getFromDB();
  }

  getFromDB = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.props.set_Username(res.data.username);
        this.props.set_Profile_Pic(res.data.profile_pic);
        this.props.setUser(res.data);
        console.log(res.data.user_id);
        this.setState({
          id: res.data.user_id
        });
      })
      .then(() => this.getCharFromDb(this.state.id));
  };

  getCharFromDb = id => {
    console.log(id);
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
    console.log("chId:", chId, "id", id);
    axios
      .delete(`/api/char?idToDelete=${chId}&user_id=${id}`)
      .then(res => {
        this.props.setCharacters(res.data);
      })
      .then(this.getFromDB());
    if (!this.state.rerender) {
      this.setState({
        rerender: true
      });
    } else {
      this.setState({
        rerender: false
      });
    }
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

  characterChange = value => {
    console.log("characterChange:", value);
    this.setState({
      selectedCharacter: value
    });
    this.props.setCurrentCharacter(value);
  };

  render() {
    console.log("this.props:", this.props);
    if (this.state.redirect) {
      return <Redirect to="/dungeon" />;
    }
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
      myOtherToggle
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
    const mappedSelector = myCharacters.map((element, index) => {
      return (
        <CharacterSelector
          chId={element.character_id}
          name={element.character_name}
        />
      );
    });
    return (
      <div className="ProfileWrapper">
        <div className="profileContainer">PROFILE</div>
        <h3>Select character to post as</h3>
        <select
          onChange={e => this.characterChange(+e.target.value)}
          value={this.state.selectedCharacter}
          name="selectedCharacter"
        >
          <option />
          {mappedSelector}
        </select>
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
        <SearchContainer />
        <DungeonList getIdOnClick={this.getIdOnClick} />
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
  setCharacters,
  setCurrentCharacter,
  setUser,
  setPosts
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
