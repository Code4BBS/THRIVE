import React, { useState } from "react";
import TagList from "./TagsList";
import Results from "./ProjectCollaborators";
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

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(componentStyles);

function Profile({ user }) {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();

  // console.log(user);

  const [values, setValues] = useState({
    title: "",
    description: "",
    communication: "",
    duration: "",
    preRequisite: "",
  });

  const [preRequisite, setPreRequisite] = useState(false);
  const [duration, setDuration] = useState(false);
  const [tagsPane, setShowTagsPane] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [collaboratorsPane, setCollaboratorsPane] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const postProject = (event) => {
    event.preventDefault();
    let tags = selectedTags;
    let collaborators = selectedCollaborators;

    axios
      .post("/api/v1/project", { ...values, tags, collaborators })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          let confirm = window.confirm("Project Added Successfully");
          if (confirm) {
            history.push("/projects");
          }
        } else {
          window.alert("Failed to Add Project! Try Again after some time");
        }
      });
  };

  const getAllTags = () => {
    let data = ["hello"];
    axios
      .get("/api/v1/user/tag", { withCredentials: true })
      .then((response) => {
        data = response.data.data.docs;
        console.log("response");
        setTagsList(data);
        setCollaboratorsPane(false);
        setShowTagsPane(true);
      })
      .catch((err) => console.log(err));
  };
  const hideTagsPane = () => {
    setShowTagsPane(false);
  };
  const showTags = () => {
    if (tagsList.length > 0) {
      setCollaboratorsPane(false);
      setShowTagsPane(true);
    } else {
      getAllTags();
    }
  };

  const getSelectedTags = (tagsSelected) => {
    console.log(tagsSelected);
    setSelectedTags(tagsSelected);
    setShowTagsPane(false);
  };

  const getAllUsers = () => {
    axios
      .get("/api/v1/user", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        setCustomers(response.data.data.docs);
        setShowTagsPane(false);
        setCollaboratorsPane(true);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Something went wrong ! Try again Later");
      });
  };

  const showCollaboratorsPane = () => {
    if (customers.length > 0) {
      setShowTagsPane(false);
      setCollaboratorsPane(true);
    } else {
      getAllUsers();
    }
  };

  const hideCollaboratorsPane = () => {
    setCollaboratorsPane(false);
  };

  const getSelectedCollaborators = (collaboratorSelected) => {
    console.log(collaboratorSelected);
    setSelectedCollaborators(collaboratorSelected);
    setCollaboratorsPane(false);
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
                      Add New Project
                    </Box>
                    <br />
                    <Chip
                      variant="outlined"
                      label={user.name}
                      avatar={<Avatar src={user.image} />}
                      styles={{ color: "black!important" }}
                    />
                  </Grid>
                  {/* <Grid item xs="auto">
              <Box
                justifyContent="flex-end"
                display="flex"
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Settings
                </Button>
              </Box>
            </Grid> */}
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
                Project Details
              </Box>
              <div className={classes.plLg4}>
                <Grid container>
                  <Grid item xs={12} lg={12}>
                    <FormGroup>
                      <FormLabel>Title</FormLabel>
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
                          label="Title"
                          name="title"
                          onChange={handleChange}
                          value={values.title}
                          classes={{ input: classes.searchInput }}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormGroup>
                      <FormLabel>Description</FormLabel>
                      <FormControl
                        variant="filled"
                        style={{
                          width: "100%",
                          marginBottom: "1rem!important",
                        }}
                      >
                        <FilledInput
                          style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                          }}
                          classes={{ input: classes.searchInput }}
                          fullWidth
                          multiline
                          rows="4"
                          label="Description"
                          name="description"
                          placeholder="Description includes the idea of the project and what you intend to do. Any other specific requirements like only specific year's or branch's should be mentioned here."
                          onChange={handleChange}
                          required
                          value={values.description}
                          variant="filled"
                        />
                      </FormControl>
                      <FormHelperText variant="outlined">
                        Describe your project
                      </FormHelperText>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <FormGroup>
                      <FormLabel>Pre Requisite</FormLabel>
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
                          value={values.preRequisite}
                          label="Pre Requisite"
                          name="preRequisite"
                          onChange={handleChange}
                          disabled={preRequisite}
                          placeholder="E.g. Python is required skill."
                        />
                      </FormControl>

                      <FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPreRequisite(true);

                                  setValues({
                                    ...values,
                                    preRequisite: "No Pre Requisite",
                                  });
                                } else {
                                  setPreRequisite(false);
                                  setValues({
                                    ...values,
                                    preRequisite: "",
                                  });
                                }
                              }}
                            />
                          }
                          label="No Pre Requisite"
                          labelPlacement="end"
                          classes={{ label: classes.checkBoxLabel }}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
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
                          disabled={duration}
                          placeholder="E.g. 1 month from June 2021"
                        />
                      </FormControl>

                      <FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setDuration(true);

                                  setValues({
                                    ...values,
                                    duration: "No specific duration",
                                  });
                                } else {
                                  setDuration(false);
                                  setValues({
                                    ...values,
                                    duration: "",
                                  });
                                }
                              }}
                            />
                          }
                          label="No Specific Duration"
                          labelPlacement="end"
                          classes={{ label: classes.checkBoxLabel }}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} lg={6} style={{ marginBottom: "10px" }}>
                    <Button variant="outlined" size="small" onClick={showTags}>
                      {!selectedTags.length > 0 ? "Select Tags" : "Edit Tags"}
                    </Button>
                    <div style={{ marginTop: "5%" }}>
                      {selectedTags.length > 0
                        ? tagsList.map((tag, index) => {
                            //selectedTags : id

                            if (selectedTags.includes(tag._id)) {
                              return (
                                <li
                                  key={index}
                                  style={{ display: "inline", margin: "3px" }}
                                >
                                  <Chip
                                    variant="default"
                                    // size="small"
                                    label={tag.name}
                                    color="primary"
                                  />
                                </li>
                              );
                            }
                            return null;
                          })
                        : null}
                    </div>
                  </Grid>

                  <Grid item xs={12} lg={6} style={{ marginBottom: "10px" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={showCollaboratorsPane}
                    >
                      {!selectedCollaborators.length > 0
                        ? "Select Collaborators"
                        : "Edit Collaborators"}
                    </Button>
                    <div style={{ marginTop: "5%" }}>
                      {selectedCollaborators.length > 0
                        ? customers.map((collaborator, index) => {
                            //selectedTags : id

                            if (
                              selectedCollaborators.includes(collaborator._id)
                            ) {
                              return (
                                <li
                                  key={index}
                                  style={{ display: "inline", margin: "3px" }}
                                >
                                  <Chip
                                    variant="outlined"
                                    // color="primary"
                                    label={collaborator.name}
                                    avatar={<Avatar src={collaborator.image} />}
                                    style={{ color: "black!important" }}
                                  />

                                  {/* <Chip
                                    variant="default"
                                    size="small"
                                    label={collaborator.name}
                                    color="primary"
                                  /> */}
                                </li>
                              );
                            }
                            return null;
                          })
                        : null}
                    </div>
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
                Contact Information
              </Box>
              <div className={classes.plLg4}>
                <Grid container>
                  <Grid item xs={12} lg={12}>
                    <FormGroup>
                      <FormLabel>How to reach you ?</FormLabel>
                      <FormControl
                        variant="filled"
                        style={{
                          width: "100%",
                          marginBottom: "1rem!important",
                        }}
                      >
                        <FilledInput
                          style={{
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                          }}
                          classes={{ input: classes.searchInput }}
                          fullWidth
                          multiline
                          rows="3"
                          label="communication"
                          name="communication"
                          placeholder="Enter Contact Details"
                          onChange={handleChange}
                          required
                          value={values.communication}
                          variant="filled"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
              </div>
            </CardContent>

            <Divider />
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
                disabled={
                  !(
                    values.title &&
                    values.description &&
                    values.communication &&
                    values.preRequisite &&
                    values.duration
                  )
                }
                onClick={(e) => {
                  postProject(e);
                  // window.alert("clicked");
                }}
              >
                Save
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Header />
      {/* Page content */}

      {!tagsPane && !collaboratorsPane ? (
        form
      ) : tagsPane && !collaboratorsPane ? (
        <Container>
          <TagList
            tags={tagsList}
            hide={hideTagsPane}
            getTags={getSelectedTags}
            tagsSelected={selectedTags}
          />
        </Container>
      ) : !tagsPane && collaboratorsPane ? (
        <Container>
          <Results
            currentUser={user}
            customers={customers}
            hide={hideCollaboratorsPane}
            initialSelectedCollaborators={selectedCollaborators}
            getCollaboraters={getSelectedCollaborators}
          ></Results>
        </Container>
      ) : null}
    </>
  );
}

export default Profile;
