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

import axios from "axios";

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  getUser = (cookies) => {
    axios
      .get("/api/v1/user/profile")
      .then((res) => {
        console.log(res.data.data.user);
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
    console.log(response.data.user);
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
  };

  render() {
    return (
      <div>
        {!this.state.isLoading ? (
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
                        {...props}
                      />
                    )}
                  />
                  <Redirect from="/" to="/index" />
                </Switch>
              </Router>
            ) : (
              <AuthLayout sucessLogin={this.getLoggedInUser} />
            )}
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default withCookies(Wrapper);
