import React, { useState, useEffect } from "react";
// import ProjectTable from "./ProjectTable";

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

import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/dashboard.js";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { Avatar, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(componentStyles);

function Classroom({ user, history }) {
  // const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .post("/api/v1/course/my-courses", user.coursesEnrolled)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      {courses.length > 0 ? (
        <Grid
          container
          spacing={3}
          style={{
            margin: "-6rem auto 0px auto",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {courses.map((course, index) => (
            <Grid
              item
              style={{
                width: "340px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              component={Box}
              marginBottom="3rem!important"
              key={course.courseCode}
              onClick={() => {
                //console.log("clicked");
                history.push(`/courses/${course.courseCode}/${course.id}`);
              }}
            >
              <Card
                classes={
                  {
                    // root: classes.cardRoot,
                  }
                }
                style={{
                  height: "100%",
                  boxShadow: "0px 0px 1rem rgba(136,152,170,0.35)",
                  border: "0!important",
                }}
              >
                <CardHeader
                  style={{ minHeight: "140px" }}
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
                        <Box component="span" color={theme.palette.gray[600]}>
                          {course.courseCode}
                        </Box>
                      </Box>
                    </Box>
                  }
                  classes={{ root: classes.cardHeaderRoot }}
                ></CardHeader>
                <CardContent classes={{ root: classes.cardHeaderRoot }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
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
          ))}
        </Grid>
      ) : (
        <Grid item>
          <Card
            style={{
              display: "flex",
              fontSize: "20px",
              padding: "20px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {!isLoading ? (
              "You are not enrolled in any courses"
            ) : (
              <CircularProgress style={{ margin: "auto" }} />
            )}
          </Card>
        </Grid>
      )}
    </div>
  );
}

export default Classroom;
