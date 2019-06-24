import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Dungeon from "./Components/Dungeon/Dungeon";
import "./reset.css";
import "./App.scss";
import LandingPad from "./Components/Landing/LandingPad";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={LandingPad} />
        <Route path="/profile" component={Profile} />
        <Route path="/dungeon" component={Dungeon} />
        <Route
          path="*"
          render={() => {
            return <div> 404 file not found</div>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
