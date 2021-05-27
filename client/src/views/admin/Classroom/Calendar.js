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
    const selectedDate = value.value.toLocaleString().split(",")[0];
    let dateArr = selectedDate.split("/");
    const formattedDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    setDate(formattedDate);
  };

  const getAssignments = () => {
    axios
      .get(`/api/v1/course/deadline?deadline=${date}`)
      .then((res) => {
        console.log(res.data.data);
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
      <Paper className={classes.paper}>
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
      <div style={{ display: "flex", margin: "20px" }}>
        <CalendarComponent change={changeDate} value={date}></CalendarComponent>
        <Grid container style={{ marginLeft: "20px" }}>
          <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                >
                  <CardHeader title="Assignments"></CardHeader>
                  <CardContent>
                    <div className={classes.paperRoot}>{cardContent}</div>
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
