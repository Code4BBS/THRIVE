import React, { useState } from "react";
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

import { useHistory } from "react-router-dom";

import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import axios from "axios";

const useStyles = makeStyles(componentStyles);

function CollegeDashboard({ user }) {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  console.log(user);
  // const [showProjectTable, setShowProjectTable] = useState(false);
  // const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // const getAllProjects = () => {
  //   setLoading(true);
  //   axios.get("/api/v1/project").then((response) => {
  //     // console.log(response);
  //     if (response.status === 200) {
  //       setLoading(false);

  //       if (response.data.data.res > 0) {
  //         setProjects(response.data.data.projects);

  //         setShowProjectTable(true);
  //       } else {
  //         window.alert("Currently no projects available !");
  //       }
  //     }
  //   });
  // };

  // const getMyProjects = () => {
  //   setLoading(true);
  //   axios.get("/api/v1/project/myProjects").then((response) => {
  //     // console.log(response);
  //     if (response.status === 200) {
  //       setLoading(false);
  //       if (response.data.data.res > 0) {
  //         setProjects(response.data.data.projects);
  //         setShowProjectTable(true);
  //       } else {
  //         window.alert("Currently you are not associated with any project.");
  //       }
  //     }
  //   });
  // };

  // const hideTable = () => {
  //   setShowProjectTable(false);
  // };

  const projectCards = (
    <Container
      maxWidth={false}
      component={Box}
      marginTop="-6rem"
      classes={{ root: classes.newContainerRoot }}
    >
      <Grid container>
        <Grid item xs={12} xl={2} sm={12} md={2}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={4}
          component={Box}
          marginBottom="3rem!important"
        >
          <Card
            classes={{
              root: classes.cardHeaderRoot + " " + classes.cardRootBgGradient,
            }}
          >
            <CardHeader
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
                      color={theme.palette.white.main}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Courses
                    </Box>
                  </Box>

                  <Box
                    component={Typography}
                    variant="h5"
                    letterSpacing=".0625rem"
                    marginBottom=".25rem!important"
                  >
                    <Box component="span" color={theme.palette.gray[400]}>
                      List of all courses in the college and new courses to be
                      added.
                    </Box>
                  </Box>
                </Box>
              }
              classes={{ root: classes.cardHeaderRoot }}
            ></CardHeader>
            <CardContent classes={{ root: classes.cardHeaderRoot }}>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  history.push("/courses/all");
                  // getAllProjects();
                }}
              >
                {!isLoading ? "Explore" : "Loading..."}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={4}
          component={Box}
          marginBottom="3rem!important"
        >
          <Card
            classes={{
              root: classes.cardHeaderRoot + " " + classes.cardRootBgGradient,
            }}
          >
            <CardHeader
              subheader={
                <Box>
                  <Box
                    component={Typography}
                    variant="h2"
                    className={classes.textUppercase}
                    marginBottom="1.5rem!important"
                  >
                    <Box
                      component="span"
                      color={theme.palette.white.main}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Users
                    </Box>
                  </Box>

                  <Box
                    component={Typography}
                    variant="h5"
                    letterSpacing=".0625rem"
                    marginBottom=".25rem!important"
                  >
                    <Box component="span" color={theme.palette.gray[400]}>
                      Colleges students, teachers and other members.
                    </Box>
                    <br />
                  </Box>
                </Box>
              }
              classes={{ root: classes.cardHeaderRoot }}
            ></CardHeader>
            <CardContent classes={{ root: classes.cardHeaderRoot }}>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  history.push("/projects/myProjects");
                }}
              >
                {!isLoading ? "Explore" : "Loading..."}
              </Button>
              {/* <Button
                size="small"
                color="primary"
                onClick={() => {
                  window.location.href = "/projects/add";
                }}
              >
                Add New Project
              </Button> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={2} xs={12} xl={2}></Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Header />
      {projectCards}
    </>
  );
}

export default CollegeDashboard;
