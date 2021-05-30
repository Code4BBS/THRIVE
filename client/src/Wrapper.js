import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { CircularProgress } from "@material-ui/core";

import axios from "axios";

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    loggingOut: false,
  };

  getUser = (cookies) => {
    axios
      .get("/api/v1/user/profile")
      .then((res) => {
        //console.log(res.data.data.user);
        this.setState({
          user: res.data.data.user,
          isLoggedIn: cookies ? cookies.isLoggedIn : this.state.isLoggedIn,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  checkIsLoggedIn = () => {
    const cookies = this.props.cookies.cookies;
    if (cookies.userData) {
      this.getUser(cookies);
    } else {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = () => {
    this.checkIsLoggedIn();
  };

  getLoggedInUser = (response) => {
    this.setState({ user: response.data.user, isLoggedIn: true });
    //console.log(response.data.user);
    const userData = {
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role,
      image: response.data.user.image,
    };
    const cookies = this.props.cookies;
    cookies.set("userData", userData, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
    cookies.set("isLoggedIn", true, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
    cookies.set("JWTClient", response.data.token, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
  };

  load = (val) => {
    this.setState({ isLoading: val });
  };

  logOut = (val) => {
    this.setState({ loggingOut: val });
  };

  render() {
    return (
      <div>
        {!this.state.isLoading && !this.state.loggingOut ? (
          <>
            {this.state.isLoggedIn && this.state.user ? (
              <Router>
                <Switch>
                  <Route
                    path="/"
                    render={(props) => (
                      <AdminLayout
                        user={this.state.user}
                        cookies={this.props.cookies}
                        getUserAgain={this.getUser}
                        logOut={this.logOut}
                        {...props}
                      />
                    )}
                  />
                  <Redirect from="/" to="/user-profile" />
                </Switch>
              </Router>
            ) : (
              <AuthLayout sucessLogin={this.getLoggedInUser} load={this.load} />
            )}
          </>
        ) : this.state.loggingOut ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <h3 style={{ marginLeft: "20px" }}>Logging Out...</h3>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <h3 style={{ marginLeft: "20px" }}>Loading...</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withCookies(Wrapper);
