import React, { useState } from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";

// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";

// core components
import componentStyles from "assets/theme/components/auth-navbar.js";

const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "responsive-menu-id";
  const ListObject = (
    <Box
      display="flex"
      alignItems="center"
      width="auto"
      component={List}
      className={classes.flexDirectionColumn}
    >
      <ListItem
        component={Link}
        to="/dashboard"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={Dashboard}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Dashboard
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/register"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={AccountCircle}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Register
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/login"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={VpnKey}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Login
      </ListItem>
      <ListItem
        component={Link}
        to="/user-profile"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={Person}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Profile
      </ListItem>
    </Box>
  );
  return (
    <>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            marginTop=".75rem"
            component={Box}
            maxWidth="xl"
          >
            <Box color="text.primary" height="30px" className={classes.header}>
              <div style={{ fontSize: "22px" }}></div>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
