import React, { Component } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { set_Username, set_Profile_Pic } from "../../ducks/userReducer";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profile_pic: "",
      id: 0,
      chId: 0
    };
    this.getFromDB = this.getFromDB.bind(this);
  }

  componentDidMount() {
    this.getFromDB();
  }

  getFromDB() {
    axios.get("/api/user").then(res => {
      console.log(res.data);
      this.props.set_Username(res.data.username);
      this.props.set_Profile_Pic(res.data.profile_pic);
      this.setState({
        id: res.data.user_id
      });
    });
  }

  getCharFromDb() {
    axios.get(`/api/char/${id}`).then.then(res => {});
  }

  addChar() {
    axios.post(`/api/newChar/${id}`).then(res => {});
  }

  changeUserInfo = id => {
    console.log(id);
    const { username, profile_pic } = this.state;
    axios
      .put(`/api/user/${id}`, { username, profile_pic })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        return alert(err);
      });
  };

  universalChangeHandler = (prop, value) => {
    console.log(prop, value);
    this.setState({
      [prop]: value
    });
  };

  //   submit() {
  //     const { changeName, changePic } = this.state;
  //     if (this.username) {
  //       changeName();
  //     }
  //     if (this.password) {
  //       changePic();
  //     }
  //   }

  render() {
    const { username, profile_pic, id } = this.state;
    return (
      <div>
        <div className="profileContainer">PROFILE</div>
        <Header />
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
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  set_Username,
  set_Profile_Pic
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
