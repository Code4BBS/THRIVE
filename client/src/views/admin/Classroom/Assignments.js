import React, { useEffect } from "react";

import "./Button.css";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import componentStyles from "assets/theme/views/admin/dashboard.js";
const useStyles = makeStyles(componentStyles);

const Assignments = ({ course }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    console.log(course);
  }, [course]);

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
            fontSize: "40px",
            margin: "10px",
            position: "absolute",
          }}
          onClick={() => {
            history.push(`/new-assignment/${course.id}`);
          }}
        >
          <AddRoundedIcon fontSize="large" />
        </IconButton>
        <Typography style={{ fontSize: "20px", padding: "20px 0px" }}>
          No Assignments have been posted
        </Typography>
      </Card>
    </Grid>
  );
};

export default Assignments;
