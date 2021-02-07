import React from "react";
import "./App.css";
import SignUp from "./components/Signup.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login.js";
import "./App.css";
import Home from "./components/Home.js";
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";



function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/login"  component={Login} />
          <Route path="/home" exact  component={Home} />
          <Redirect from="*" to="/"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
