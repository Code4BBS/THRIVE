import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./Course.css";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Classes from "./Classes";
import Assignments from "./Assignments";
import ChatRoom from "./ChatRoom";
import Enrolled from "./EnrolledStudents";
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/dashboard.js";

import axios from "axios";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(componentStyles);

function Course({ user, cookies, history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setLoading] = useState(false);

  const [course, setCourse] = useState({});
  const [tab, setTab] = useState("Classes");
  const [socket, setSocket] = useState(null);

  let id;
  useEffect(() => {
    id = window.location.pathname.split("/")[3];

    axios
      .get(`/api/v1/course/${id}`)
      .then((res) => {
        setCourse(res.data);

        if (
          !res.data.students.includes(user._id) &&
          res.data.teacher !== user._id
        ) {
          const con = window.confirm(
            "You are not associated with this course."
          );

          if (con) {
            history.push(`/classroom`);
          }
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        history.push("/classroom");
      });
  }, []);

  const setupSocket = (courseId) => {
    const token = cookies.cookies.JWTClient;
    const socketSetup = io.connect(`http://localhost:3000/`, {
      withCredentials: true,
      query: { token, courseId },
    });

    socketSetup.emit("join", courseId);

    return socketSetup;
  };

  return (
    <div>
      <Header />

      {course.courseCode ? (
        <Grid
          item
          style={{
            width: "100%",
            marginTop: "-6rem",
            marginBottom: "20px",
          }}
          component={Box}
          key={course.courseCode}
        >
          <Card
            classes={{
              root: classes.cardRoot,
            }}
            style={{
              height: "100%",
              flexDirection: "unset",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <CardHeader
              style={{
                minHeight: "140px",
                minWidth: "min(300px,80vw)",
                border: 0,
              }}
              subheader={
                <Box>
                  <Box
                    component={Typography}
                    variant="h2"
                    className={classes.textUppercase}
                    marginBottom="1rem!important"
                  >
                    <Box
                      component="span"
                      //   color={theme.palette.white.main}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {course.name}
                    </Box>
                  </Box>

                  <Box
                    component={Typography}
                    variant="h5"
                    letterSpacing=".0625rem"
                    marginBottom=".25rem!important"
                  >
                    <Box
                      component="span"
                      color={theme.palette.gray[400]}
                      style={{ fontSize: "16px", color: "grey" }}
                    >
                      {course.courseCode}
                    </Box>
                  </Box>
                </Box>
              }
              classes={{ root: classes.cardHeaderRoot }}
            ></CardHeader>
            <CardContent
              classes={{ root: classes.cardHeaderRoot }}
              style={{ width: "min(300px,80vw)", display: "flex" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                  }}
                  src={course.teacher.image}
                />
                <Typography>{course.teacher.name}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <div style={{ textAlign: "center" }}>
        <Button
          className={tab === "Classes" ? "active" : "in-active"}
          onClick={() => {
            setTab("Classes");
          }}
        >
          Classes
        </Button>
        <Button
          className={tab === "Assignments" ? "active" : "in-active"}
          onClick={() => {
            setTab("Assignments");
          }}
        >
          Assignments
        </Button>
        <Button
          className={tab === "chatRoom" ? "active" : "in-active"}
          onClick={() => {
            if (!socket) {
              const newSocket = setupSocket(course._id);
              setSocket(newSocket);
            }
            setTab("chatRoom");
          }}
        >
          Classroom Chat
        </Button>
        {user.role == "Teacher" ? (
          <Button
            className={tab === "Enrolled" ? "active" : "in-active"}
            onClick={() => {
              setTab("Enrolled");
            }}
          >
            Enrolled students
          </Button>
        ) : null}
      </div>
      <div style={{ marginTop: "30px" }}>
        {tab === "Classes" ? (
          <Classes course={course} />
        ) : tab === "Assignments" ? (
          <Assignments course={course} history={history} user={user} />
        ) : tab == "chatRoom" ? (
          <ChatRoom user={user} cookies={cookies} socket={socket} />
        ) : (
          <Enrolled user={user} cookies={cookies} course={course} />
        )}
      </div>
    </div>
  );
}

export default Course;
