import React, { Component } from "react";
import "./StoreList.scss";
import axios from "axios";
import { connect } from "react-redux";
import { setPosts } from "../../ducks/postReducer";
import { setCurrentCharacter } from "../../ducks/currentCharacterReducer";
import { setUser } from "../../ducks/userReducer";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      redirect: false
    };
  }

  makePost = object => {
    if (!this.props.setCurrentCharacter.currentCharacter) {
      toast.error("Please select a character.");
    }
    console.log(object, "this is my post object");
    axios.post("/api/post", object).then(res => {
      toast.success("Post Created");
      this.props.setPosts(res.data);
      this.setState({
        redirect: true
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
    if (this.state.redirect) {
      return <Redirect to="/dungeon" />;
    }
    const { name, address } = this.props;
    const post = {
      content: this.state.content,
      character_id: this.props.currentCharacter.currentCharacter,
      user_id: this.props.user.user.user_id,
      dungeon_name: name,
      dungeon_address: address
    };
    console.log(name);
    return (
      <div className="storeListContainer">
        <div className="list">
          {name} {address}
        </div>
        <input
          type="text"
          placeholder="Post on this board"
          onChange={e =>
            this.universalChangeHandler(e.target.name, e.target.value)
          }
          value={this.state.content}
          name="content"
        />
        <button onClick={() => this.makePost(post)}>Post On this board.</button>
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

export default invokedConnect(StoreList);
