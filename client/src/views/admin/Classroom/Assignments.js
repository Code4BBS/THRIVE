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
  Avatar,
} from "@material-ui/core";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import FormatDate from "./../Quora/formatDate";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";

import axios from "axios";

import componentStyles from "assets/theme/views/admin/dashboard.js";
const useStyles = makeStyles(componentStyles);

const Assignments = ({ course, history, user }) => {
  console.log(course);
  const classes = useStyles();
  let id = window.location.pathname.split("/")[3];
  console.log(id);

  const [assignments, setAssignments] = useState([]);

  const getAllCourseAssignments = () => {
    axios
      .get(`/api/v1/course/assignments/${id}`)
      .then((res) => {
        setAssignments(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCourseAssignments();
  }, []);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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
        {user.role == "Teacher" ? (
          <IconButton
            style={{
              width: "50px",
              height: "50px",
              fontSize: "40px",
              margin: "10px",
              position: "absolute",
            }}
            onClick={() => {
              history.push(`/new-assignment/${course._id}`);
            }}
          >
            <AddRoundedIcon
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </IconButton>
        ) : null}
        <Typography
          style={{ fontSize: "20px", padding: "20px 0px", height: "70px" }}
        >
          {assignments.length === 0 ? "No Assignments have been posted" : null}
        </Typography>
        <Timeline>
          {assignments.length > 0
            ? assignments.map((assignment, index) => {
                let timeString = new Date(assignment.createdAt)
                  .toLocaleTimeString()
                  .split(":");
                const time =
                  timeString[0] +
                  ":" +
                  timeString[1] +
                  " " +
                  timeString[2].split(" ")[1];
                return (
                  <TimelineItem key={`timeline-${index}`}>
                    <TimelineOppositeContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ width: "70px" }}
                      >
                        {months[new Date(assignment.createdAt).getMonth()] +
                          " " +
                          new Date(assignment.createdAt).getDay()}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        style={{ border: 0, padding: 0, margin: "5px" }}
                      >
                        <Avatar
                          src={assignment.teacher.image}
                          style={{ height: "32px", width: "32px" }}
                        />
                      </TimelineDot>
                      {index !== assignments.length - 1 ? (
                        <TimelineConnector />
                      ) : null}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div
                        style={{
                          textAlign: "left",
                          alignItems: "center",
                          display: "flex",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/assignment/${assignment._id}`);
                        }}
                      >
                        <p style={{ padding: 0, margin: 0 }}>
                          &nbsp;Posted a new assignment: &nbsp;
                          <b>{assignment.name}</b>
                        </p>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                );
              })
            : null}
        </Timeline>
      </Card>
    </Grid>
  );
};

export default Assignments;
