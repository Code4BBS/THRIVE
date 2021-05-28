import React from "react";
import { useHistory } from "react-router-dom";

// @material-ui/icons components

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

const useStyles = makeStyles(componentStyles);

const ProjectBoard = ({ user }) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

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
                      All Projects
                    </Box>
                  </Box>

                  <Box
                    component={Typography}
                    variant="h5"
                    letterSpacing=".0625rem"
                    marginBottom=".25rem!important"
                  >
                    <Box component="span" color={theme.palette.gray[400]}>
                      Projects currently listed in the website for
                      collaboration.
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
                  history.push("/projects/all");
                }}
              >
                Explore
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
                    marginBottom="1rem!important"
                  >
                    <Box
                      component="span"
                      color={theme.palette.white.main}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      My Projects
                    </Box>
                  </Box>

                  <Box
                    component={Typography}
                    variant="h5"
                    letterSpacing=".0625rem"
                    marginBottom=".25rem!important"
                  >
                    <Box component="span" color={theme.palette.gray[400]}>
                      Projects you are participating in.
                      <br />
                      <br />
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
                  history.push("/projects/myProjects");
                }}
              >
                Explore
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  history.push("/projects/add");
                }}
              >
                Add New Project
              </Button>
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
};

export default ProjectBoard;
