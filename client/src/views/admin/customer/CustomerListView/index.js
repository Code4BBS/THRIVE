import React, { Component } from "react";
import { Box, Container, withStyles, Card } from "@material-ui/core";
import Page from "./Page";
import Results from "./Results";
import axios from "axios";
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

class CustomerListView extends Component {
  state = {
    users: [],
    tags: [],
    isLoadingUsers: false,
    isLoadingTags: false,
  };
  getAllUsers = () => {
    this.setState({ isLoadingUsers: true });
    axios
      .get("/api/v1/user", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          users: response.data.data.docs,
          isLoadingUsers: false,
        });
      })
      .catch((err) => {
        this.setState({ isLoadingUsers: false });
      });
  };
  getAllTags = () => {
    this.setState({ isLoadingTags: true });
    axios
      .get("/api/v1/user/tag", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ tags: response.data.data.docs, isLoadingTags: false });
      })
      .catch((err) => {
        this.setState({ isLoadingTags: false });
      });
  };
  componentDidMount = () => {
    this.getAllUsers();
    this.getAllTags();
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.state.isLoadingUsers && !this.state.isLoadingTags ? (
          <>
            <Header />
            <Container
              maxWidth={false}
              component={Box}
              marginTop="-6rem"
              classes={{ root: classes.containerRoot }}
            >
              <Card
                classes={{ root: classes.cardRoot }}
                style={{ padding: "1px" }}
              >
                <Results customers={this.state.users} tags={this.state.tags} />
              </Card>
            </Container>
          </>
        ) : null}
      </div>
    );
  }
}
export default withStyles(componentStyles)(CustomerListView);
