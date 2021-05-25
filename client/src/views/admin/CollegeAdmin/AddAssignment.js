import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TagList from "./../Project/TagsList";
import Results from "./../Project/ProjectCollaborators";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";

// core components
import Header from "../../../components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";
import Chip from "@material-ui/core/Chip";
import axios from "axios";

const useStyles = makeStyles(componentStyles);

function CreateAssignment({ user, courseId }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  // console.log(user);

  const [values, setValues] = useState({
    name: "",
    duration: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

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
    const query = `/api/v1/course/assignment?courseId=60abc56d34c3f230b482a678&name=${values.name}`;
    axios
      .post(query, formData, { withCredentials: true })
      .then((response) => {
        console.log(response);
        alert("New assignment created");
        history.push("/classroom");
      })
      .catch((err) => console.log(err));
  };

  const form = (
    <Container
      maxWidth={false}
      component={Box}
      marginTop="-6rem"
      classes={{ root: classes.containerRoot }}
    >
      <Grid container>
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
                    <br />
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
                      <FormLabel>Topic</FormLabel>
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
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <FormGroup>
                      <FormLabel>Upload File</FormLabel>
                      <FormControl variant="filled" width="100%">
                        <FilledInput
                          style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                          }}
                          type="file"
                          name="file"
                          onChange={selectFile}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
              </div>
              <Box
                component={Divider}
                marginBottom="0.8rem!important"
                marginTop="0.8rem!important"
              />
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
                Submit Assignment
              </Box>
              <Box
                sx={{
                  display: "center",

                  p: 2,
                }}
              >
                {console.log(values.name)}
                {console.log(selectedFile)}
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
                  Submit
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
