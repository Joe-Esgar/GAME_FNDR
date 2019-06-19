import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setPosts } from "../../ducks/postReducer";
import { setCurrentCharacter } from "../../ducks/currentCharacterReducer";
import { setUser } from "../../ducks/userReducer";

class Dungeons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      content: ""
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     chId: this.props.currentCharacter.currentCharacter,
  //     user_id: this.props.user.user_id
  //   });
  // }

  createPost = object => {
    axios.post(`/api/post`, object).then(res => {
      this.props.setPosts(res.data);
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

  // const {
  //   content,
  //   user_id,
  //   character_id,
  //   dungeon_name,
  //   dungeon_address
  // } = req.body;

  render() {
    console.log("check", this.props);
    if (!this.props.user.user) {
      return <></>;
    }

    console.log("PROPS IN DUNGHEONS,", this.props);
    const post = {
      content: this.state.content,
      character_id: this.props.currentCharacter.currentCharacter,
      user_id: this.props.user.user.user_id,
      dungeon_name: this.props.name,
      dungeon_address: this.props.address
    };
    return (
      <div className="DungeonContainer">
        <ul onClick={() => this.props.getIdOnClick(this.props.id)}>
          <li>{this.props.time_entered}</li>
          <li>{this.props.name}</li>
          <li>{this.props.address}</li>
        </ul>
        {this.state.toggle ? (
          <div>
            <button onClick={() => this.setState({ toggle: false })}>
              Hide
            </button>
            <h2>Post</h2>
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={this.state.content}
              name="content"
              placeholder="Type post here"
            />
            <button onClick={() => this.createPost(post)}>Post</button>
          </div>
        ) : (
          <button onClick={() => this.setState({ toggle: true })}>Post</button>
        )}
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPosts,
  setCurrentCharacter,
  setUser
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Dungeons);
