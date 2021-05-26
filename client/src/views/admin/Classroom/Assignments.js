import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Button.css";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import axios from "axios";
import componentStyles from "assets/theme/views/admin/dashboard.js";
const useStyles = makeStyles(componentStyles);

const Assignments = () => {
  const classes = useStyles();
  let id = window.location.pathname.split("/")[3];
  console.log(id);
  const history = useHistory();

  const [assignments, setAssignments] = useState([]);

  const getAllCourseAssignments = () => {
    axios
      .get(`/api/v1/course/assignments/${id}`)
      .then((res) => {
        setAssignments(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCourseAssignments();
  }, []);

  const redirectToAssignment = (id) => {
    console.log(window.location.pathname);
    let url = `assignment/${id}`;
    console.log(url);
    history.push(url);
  };
  return (
    <Grid
      item
      style={{
        width: "100%",
      }}
      component={Box}
    >
      {assignments.length == 0 ? (
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
          >
            <AddRoundedIcon fontSize="large" />
          </IconButton>
          <Typography style={{ fontSize: "20px", padding: "20px 0px" }}>
            No Assignments have been posted
          </Typography>
        </Card>
      ) : (
        assignments.map((assignment, index) => {
          return (
            <Card
              classes={{
                root: classes.cardRoot,
              }}
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => redirectToAssignment(assignment._id)}
            >
              <IconButton
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "40px",
                  margin: "10px",
                  position: "absolute",
                }}
              >
                <AssignmentIcon fontSize="large" color="primary" />
              </IconButton>
              <Typography style={{ fontSize: "20px", padding: "20px 0px" }}>
                {assignment.teacher.name} posted an assignment {assignment.name}
              </Typography>
            </Card>
          );
        })
      )}
    </Grid>
  );
};

export default Assignments;
