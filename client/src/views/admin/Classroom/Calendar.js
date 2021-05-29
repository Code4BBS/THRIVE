import React, { useState, useEffect } from "react";
import "./Calendar.css";
import Calendar from "react-calendar";
import Header from "../../../components/Headers/Header.js";
import "react-calendar/dist/Calendar.css";
import {
  CalendarComponent,
  ChangedEventArgs,
  DateRangePicker,
} from "@syncfusion/ej2-react-calendars";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  IconButton,
  Container,
  CardHeader,
  CardContent,
  Button,
  Divider,
  FormControl,
  FilledInput,
  Chip,
  Avatar,
  Paper,
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";

import axios from "axios";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import componentStyles from "assets/theme/views/admin/profile.js";
import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles(componentStyles);

function CalendarView({ user, history }) {
  const [date, setDate] = useState(new Date());
  const [assignments, setAssignments] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  const changeDate = (value, event) => {
    const selectedDate = value.value;
    // console.log(new Date(value.value).getFullYear());
    // let dateArr = selectedDate.split("/");
    // const formattedDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    // console.log(formattedDate);
    setDate(selectedDate);
  };

  const getAssignments = () => {
    let curr = new Date(date);

    let dt = curr.getDate();
    if (dt < 10) dt = `0${dt}`;

    let month = curr.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let Year = curr.getFullYear();
    let reqDate = Year + "-" + month + "-" + dt;
    console.log(reqDate);
    axios
      .get(`/api/v1/course/deadline?deadline=${reqDate}`)
      .then((res) => {
        // console.log(res.data.data);
        setAssignments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAssignments();
  }, [date]);

  const redirectToProject = (id) => {
    const url = `/assignment/${id}`;
    history.push(url);
  };
  const cardContent = assignments.map((assignment, ind) => {
    return (
      <Paper className={classes.paper} key={ind} style={{ maxWidth: "500px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              className={classes.avatar}
              src={assignment.teacher.image}
            ></Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{assignment.name}</Typography>
            <Typography noWrap>{assignment.description}</Typography>
          </Grid>
          <Grid>
            <SvgIcon
              style={{
                color: "blue",
                width: "25px",
                height: "30px",
                marginTop: "25px",
                cursor: "pointer",
              }}
              onClick={() => redirectToProject(assignment._id)}
            >
              <ChevronRightIcon />
            </SvgIcon>
          </Grid>
        </Grid>
      </Paper>
    );
  });

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "20px",
          minHeight: "350px",
        }}
      >
        <CalendarComponent
          onChange={changeDate}
          value={date}
          style={{ margin: "0px 20px 20px 20px" }}
        ></CalendarComponent>
        <Grid
          container
          style={{ flex: 1, padding: 0, margin: 0, maxWidth: "100%" }}
        >
          <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
            {assignments.length == 0 ? (
              <Card
                classes={{
                  root: classes.cardRoot + " " + classes.cardRootSecondary,
                }}
              >
                <CardHeader title="Assignments"></CardHeader>
                <CardContent>
                  <Typography>No Assignments deadline on this date</Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                >
                  <CardHeader title="Assignments"></CardHeader>
                  <CardContent>
                    <div
                      className={classes.paperRoot}
                      style={{ padding: 0, margin: 0 }}
                    >
                      {cardContent}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CalendarView;
