import React, { Component } from "react";
import "./landing.css";
import { setUser } from "../../ducks/userReducer";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LandingHeader extends Component {
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

  login = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return alert("Please enter a username and a password.");
    }
    axios
      .post("/api/login", { username, password })
      .then(res => {
        this.props.setUser(res.data);
        this.setState({
          redirect: true
        });
      })
      .catch(err => {
        console.log(err);
        return alert("Incorrect username or password.");
      });
  };

  render() {
    const { username, password, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="container">
        <header>
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
          <button onClick={this.login}>Login</button>
        </header>
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

export default invokedConnect(LandingHeader);
