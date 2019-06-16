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
      redirect: false,
      redirectTwo: false,
      enter: false
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
    const { username, password, email, redirect, enter } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="wrapper">
        <LandingHeader />
        <div className="container">
          {enter ? (
            <div className="registerContainer">
              <div className="register">
                <div className="reg">
                  <h2>Username</h2>
                  <input
                    className="landingInput"
                    onChange={e =>
                      this.universalChangeHandler(e.target.name, e.target.value)
                    }
                    value={username}
                    name="username"
                  />
                </div>
                <div className="reg">
                  <h2>Email</h2>
                  <input
                    className="landingInput"
                    onChange={e =>
                      this.universalChangeHandler(e.target.name, e.target.value)
                    }
                    value={email}
                    type="email"
                    name="email"
                  />
                </div>
                <div className="reg">
                  <h2>Password</h2>
                  <input
                    className="landingInput"
                    onChange={e =>
                      this.universalChangeHandler(e.target.name, e.target.value)
                    }
                    type="password"
                    value={password}
                    name="password"
                  />
                </div>
                <div className="reg">
                  <button onClick={this.register}>Register</button>
                  <button onClick={() => this.setState({ enter: false })}>
                    Flee
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="intro">
              <p>
                If you seek tabletop adventures <br /> and companions to share
                them with <br />
                enter here.
              </p>
              <button onClick={() => this.setState({ enter: true })}>
                Enter
              </button>
            </div>
          )}
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
