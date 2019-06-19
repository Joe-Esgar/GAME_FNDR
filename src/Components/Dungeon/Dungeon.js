import "./dungeon.scss";
import React, { Component } from "react";
import DungeonList from "../Profile/DungeonList";
import SelectedDungeon from "./SelectedDungeon";
import axios from "axios";
import { setPosts } from "../../ducks/postReducer";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";

class Dungeon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      dunId: 0,
      content: "",
      id: 0
    };
  }

  componentDidMount() {
    this.getFromDB();
  }

  getFromDB = () => {
    axios.get("/api/user").then(res => {
      this.props.setUser(res.data);
      console.log(res.data.user_id);
      this.setState({
        id: res.data.user_id
      });
    });
  };

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
  };

  render() {
    console.log(this.state.posts);
    const mappedPosts = this.state.posts.map((element, index) => {
      return (
        <SelectedDungeon
          key={index}
          content={element.content}
          username={element.username}
          charName={element.character_name}
          time_entered={element.time_entered}
        />
      );
    });
    return (
      <div className="MessageBoardContainer">
        <DungeonList getIdOnClick={this.getIdOnClick} />
        <div className="dungeonPosts">{mappedPosts}</div>
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPosts,
  setUser
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Dungeon);
