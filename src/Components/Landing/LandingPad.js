import React, { Component } from "react";
import "./landing.css";
import { setUser } from "../../ducks/userReducer";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LandingHeader from "./LandingHeader";

class LandingPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false
    };
  }

  universalChangeHandler = (prop, value) => {
    console.log(prop, value);
    this.setState({
      [prop]: value
    });
  };

  componentDidMount() {
    axios.get("/api/user").then(res => {
      this.props.setUser(res.data);
    });
  }

  register = () => {
    const { username, password, email } = this.state;
    if (!username || !password || !email) {
      return alert("Please enter a username, password, and email");
    }
    axios.post("/api/register", { username, password, email }).then(res => {
      console.log("recieved user", res.data);
      this.props.setUser(res.data);
      this.setState({
        redirect: true
      });
    });
  };

  render() {
    console.log(this.props, "props");
    console.log(this.state, "state");
    const { username, password, email, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="container">
        <div>
          <LandingHeader />
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
            Email:{" "}
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              value={email}
              type="email"
              name="email"
            />
          </div>
          <div>
            Password:{" "}
            <input
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
              type="password"
              value={password}
              name="password"
            />
          </div>
          <div>
            <button onClick={this.register}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

const mappedStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mappedStateToProps,
  mapDispatchToProps
);

export default invokedConnect(LandingPad);
