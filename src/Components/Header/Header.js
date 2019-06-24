import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import { Redirect } from "react-router-dom";
import logo from "./../Landing/logo2.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
      this.setState({
        redirect: true
      });
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ProfileHeader">
        <img className="log" src={logo} alt="logo" />
        <button onClick={this.logout}>Logout</button>
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

export default invokedConnect(Header);
