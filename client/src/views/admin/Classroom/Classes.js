import React from "react";

import "./Button.css";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import componentStyles from "assets/theme/views/admin/dashboard.js";
const useStyles = makeStyles(componentStyles);

const Classes = () => {
  const classes = useStyles();

  return (
    <Grid
      item
      style={{
        width: "100%",
      }}
      component={Box}
    >
      <Card
        classes={{
          root: classes.cardRoot,
        }}
        style={{ textAlign: "center" }}
      >
        <IconButton
          style={{
            width: "50px",
            height: "50px",
            margin: "10px",
            position: "absolute",
          }}
        >
          <AddRoundedIcon
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>
        <Typography style={{ fontSize: "20px", padding: "20px 0px" }}>
          No Classes seem to have occurred
        </Typography>
      </Card>
    </Grid>
  );
};

export default Classes;
