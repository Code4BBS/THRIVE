import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Button.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Header from "../../../components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/profile.js";
import Chip from "@material-ui/core/Chip";

import axios from "axios";

const useStyles = makeStyles(componentStyles);

function CreateAssignment({ user }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    duration: "",
  });

  const [course, setCourse] = useState({});
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const postAssignment = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    const query = `/api/v1/course/assignment?courseId=${course._id}&name=${values.name}`;
    axios
      .post(query, formData, { withCredentials: true })
      .then((response) => {
        console.log(response);
        alert("New assignment created");
        history.push("/classroom");
      })
      .catch((err) => console.log(err));
  };

  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(`/api/v1/course/${id}`)
      .then((res) => {
        setCourse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const form = (
    <Container
      maxWidth={false}
      component={Box}
      marginTop="-6rem"
      classes={{ root: classes.containerRoot }}
    >
      <Grid container style={{ justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          xl={8}
          component={Box}
          marginBottom="3rem"
          classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
        >
          <Card
            classes={{
              root: classes.cardRoot + " " + classes.cardRootSecondary,
            }}
          >
            <CardHeader
              subheader={
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs="auto">
                    <Box
                      component={Typography}
                      variant="h3"
                      marginBottom="0!important"
                    >
                      Add Assignment
                    </Box>
                    {course.name ? (
                      <Typography
                        style={{ color: "black", margin: "10px 0px" }}
                      >
                        {course.name.toUpperCase()} - {course.courseCode}
                      </Typography>
                    ) : null}
                    <Chip
                      variant="outlined"
                      label={user.name}
                      avatar={<Avatar src={user.image} />}
                      styles={{ color: "black!important" }}
                    />
                  </Grid>
                </Grid>
              }
              classes={{ root: classes.cardHeaderRoot }}
            ></CardHeader>
            <CardContent>
              <Box
                component={Typography}
                variant="h6"
                color={theme.palette.gray[600] + "!important"}
                paddingTop=".25rem"
                paddingBottom=".25rem"
                fontSize=".75rem!important"
                letterSpacing=".04em"
                marginBottom="1.5rem!important"
                classes={{ root: classes.typographyRootH6 }}
              >
                Assignment details
              </Box>
              <div className={classes.plLg4}>
                <Grid container>
                  <Grid item xs={12} lg={12}>
                    <FormGroup>
                      <FormLabel>Name</FormLabel>
                      <FormControl
                        variant="filled"
                        width="100%"
                        style={{
                          marginBottom: "1rem!important",
                        }}
                        required
                      >
                        <FilledInput
                          style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                          }}
                          type="text"
                          required
                          label="name"
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          classes={{ input: classes.searchInput }}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
                {/* <Grid container>
                  <Grid item xs={12} lg={6}>
                    <FormGroup>
                      <FormLabel>Duration</FormLabel>
                      <FormControl
                        variant="filled"
                        width="100%"
                        styles={{ marginBottom: "1rem!important" }}
                      >
                        <FilledInput
                          style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                          }}
                          classes={{ input: classes.searchInput }}
                          type="text"
                          value={values.duration}
                          label="Duration"
                          name="duration"
                          onChange={handleChange}
                          placeholder="E.g. 1 month from June 2021"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid> */}
                <FormControl variant="filled" width="100%">
                  <FilledInput
                    type="file"
                    name="file"
                    id="upload-file"
                    onChange={selectFile}
                    className="file-upload"
                    style={{ display: "none" }}
                  />
                </FormControl>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="upload-file">
                    <Button
                      variant="outlined"
                      component="span"
                      className={classes.button}
                      style={{ width: "130px" }}
                    >
                      Upload File
                    </Button>
                  </label>
                  <Typography
                    style={{ marginLeft: "10px", overflow: "hidden" }}
                  >
                    {selectedFile.name}
                  </Typography>
                </div>
              </div>
              <Box
                component={Divider}
                marginBottom="0.8rem!important"
                marginTop="0.8rem!important"
              />
              {/* <Box
                component={Typography}
                variant="h6"
                color={theme.palette.gray[600] + "!important"}
                paddingTop=".25rem"
                paddingBottom=".25rem"
                fontSize=".75rem!important"
                letterSpacing=".04em"
                marginBottom="1.5rem!important"
                classes={{ root: classes.typographyRootH6 }}
              >
                Submit Assignment
              </Box> */}
              <Box
                sx={{
                  display: "center",

                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  style={{ marginLeft: "40%", marginRight: "40%" }}
                  classes={{ root: classes.buttonRootDark }}
                  variant="contained"
                  disabled={!values.name && !selectedFile}
                  onClick={(e) => {
                    postAssignment(e);
                    // window.alert("clicked");
                  }}
                >
                  Create
                </Button>
              </Box>
            </CardContent>

            <Divider />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Header />
      {/* Page content */}

      {form}
    </>
  );
}

export default CreateAssignment;
