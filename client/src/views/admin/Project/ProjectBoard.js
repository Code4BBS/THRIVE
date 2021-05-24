import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// @material-ui/core components
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
// @material-ui/icons components
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Header />

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
              onClick={() => {
                window.location.href = "/admin/project/myProjects";
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
              <CardContent></CardContent>
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
                      </Box>
                    </Box>
                  </Box>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={2} xs={12} xl={2}></Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
