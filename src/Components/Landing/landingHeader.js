import React, { Component } from "react";
import "./landingHeader.scss";
import { setUser } from "../../ducks/userReducer";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from "./logo2.png";
import { ToastContainer, toast } from "react-toastify";

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
      return toast.error("Please enter a username and a password.");
    }
    axios
      .post("/api/login", { username, password })
      .then(res => {
        toast.success("Log In Successful", {});
        this.props.setUser(res.data);
        this.setState({
          redirect: true
        });
      })
      .catch(err => toast.error("Login Failed"));
  };

  render() {
    const { username, password, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="headerContainer">
        <header>
          <div>
            <img className="landingLogo" src={logo} alt="Logo" />
          </div>
          <h1>Dungeon Finder</h1>
          <div className="HeaderLogin">
            <div>
              Username:{" "}
              <input
                className="landingInput"
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
                className="landingInput"
                onChange={e =>
                  this.universalChangeHandler(e.target.name, e.target.value)
                }
                type="password"
                value={password}
                name="password"
              />
            </div>
            <button className="LGBUTTON" onClick={this.login}>
              Login
            </button>
          </div>
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
