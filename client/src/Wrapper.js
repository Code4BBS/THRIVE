import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { get } from "mongoose";

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  checkIsLoggedIn = () => {
    const cookies = this.props.cookies.cookies;
    this.setState({
      user: cookies.userData ? JSON.parse(cookies.userData) : null,
      isLoggedIn: cookies.isLoggedIn,
    });
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
        {this.state.isLoggedIn ? (
          <Router>
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Redirect from="/" to="/admin/index" />
            </Switch>
          </Router>
        ) : (
          <AuthLayout sucessLogin={this.getLoggedInUser} />
        )}
      </div>
    );
  }
}

export default withCookies(Wrapper);
