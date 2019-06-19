import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { set_Dungeons } from "../../ducks/dungeonReducer";
import Dungeons from "./Dungeons";

class DungeonList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getDungeons();
  }

  getDungeons = () => {
    axios.get("/api/dungeons").then(res => {
      console.log("dungeons res.data:", res.data);
      this.props.set_Dungeons(res.data);
    });
  };

  render() {
    console.log("DUNGEONS ARRAY:", this.props.dungeons);
    const { getIdOnClick } = this.props;
    const mappedDungeons = this.props.dungeons.map((element, index) => {
      console.log("ID", element.dungeon_id);
      return (
        <Dungeons
          getIdOnClick={getIdOnClick}
          key={element.dungeon_id}
          name={element.dungeon_name}
          address={element.dungeon_address}
          id={element.dungeon_id}
        />
      );
    });
    return <div className="DungeonList">{mappedDungeons}</div>;
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  set_Dungeons
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(DungeonList);
