import React, { Component } from "react";
import "./StoreList.scss";
import axios from "axios";
import { connect } from "react-redux";
import { setPosts } from "../../ducks/postReducer";

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  makePost = () => {};

  render() {
    const { name, address } = this.props;
    console.log(name);
    return (
      <div className="storeListContainer">
        <div className="list">
          {name} {address}
        </div>
        <input type="text" placeholder="Post on this board" />
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPosts
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(StoreList);
