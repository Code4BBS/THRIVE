import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";

// core components
import componentStyles from "assets/theme/views/auth/projectCard.js";

const useStyles = makeStyles(componentStyles);

const Project = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const project = props.project;

  return (
    <>
      <Grid item xs={12} lg={6} md={6}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            style={{ padding: "10px" }}
            title={
              <Box
                fontSize="130%"
                fontWeight="700"
                color={theme.palette.dark[600]}
              >
                {project.title}
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              fontSize: "1rem!important",
              marginTop: ".5rem!important",
              marginBottom: "0",
            }}
            subheader={
              <Box
                textAlign="center"
                fontSize="1rem!important"
                marginTop=".5rem!important"
              >
                <span>
                  <a href="/" style={{ textDecoration: "none" }}>
                    Shrirang Deshmukh &nbsp;
                    {/* {project.owner.name} */}
                  </a>
                </span>
              </Box>
            }
          ></CardHeader>
          <CardContent
            classes={{ root: classes.cardContent }}
            style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
          >
            <Box
              fontSize="100%"
              fontWeight="500"
              component="p"
              color={theme.palette.gray[900]}
              textAlign="justify"
              marginLeft="0.5rem"
              marginRight="0.5rem"
              marginBottom="1rem"

              // fontSize="1rem"
            >
              <i>{project.description}</i>
            </Box>

            <Box textAlign="center">
              {project.tags.map((tag, i) => {
                return (
                  <Box
                    key={i}
                    component={Button}
                    variant="contained"
                    marginTop="0.1rem!important"
                    marginRight=".3rem!important"
                    classes={{ root: classes.buttonRoot }}
                  >
                    <Box component="span">{tag}</Box>
                  </Box>
                );
              })}
            </Box>
            <br />
            <Box
              fontSize="100%"
              fontWeight="500"
              component="p"
              color={theme.palette.black[600]}
            >
              <span style={{ margin: "1rem" }}>
                <strong>Contact: &nbsp;</strong>
              </span>
              <p style={{ margin: "1rem" }}>{project.communication}</p>
            </Box>
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop="1rem">
          <Grid item xs={6} component={Box} textAlign="left">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Update
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign="right">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Delete
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Project;
