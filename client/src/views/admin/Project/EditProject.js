import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TagList from "./TagsList";
import Collaborators from "./ProjectCollaborators";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@material-ui/core";

// core components
import Header from "../../../components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/profile.js";

const useStyles = makeStyles(componentStyles);

const EditProject = ({ user }) => {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    title: "",
    description: "",
    communication: "",
    duration: "",
    preRequisite: "",
  });

  const [project, setProject] = useState(null);
  const [preRequisite, setPreRequisite] = useState(false);
  const [duration, setDuration] = useState(false);
  const [tagsPane, setShowTagsPane] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [collaboratorsPane, setCollaboratorsPane] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const getProject = () => {
    const url = window.location.pathname.split("/");
    const projectId = url[3];

    axios
      .get(`/api/v1/project/${projectId}`)
      .then((response) => {
        if (response.status === 200) {
          const project = response.data.data.project;

          if (project.owner._id === user._id) {
            setProject(project);

            const receivedValues = {
              title: project.title,
              description: project.description,
              duration: project.duration,
              preRequisite: project.preRequisite,
              communication: project.communication,
            };
            setValues({ ...receivedValues });

            if (project.duration === "No specific duration") setDuration(true);
            if (project.preRequisite === "No Pre Requisite")
              setPreRequisite(true);

            if (project.tags.length > 0) {
              let tags = [];
              for (let tag of project.tags) {
                tags.push(tag._id);
              }

              setSelectedTags(tags);
            }

            if (project.collaborators.length > 0) {
              let collaborators = [];
              for (let collaborator of project.collaborators) {
                collaborators.push(collaborator._id);
              }
              setSelectedCollaborators(collaborators);
            }
          } else {
            window.alert("You cannot edit this project");
            history.push(`/projects/${projectId}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTags = () => {
    axios
      .get("/api/v1/user/tag", { withCredentials: true })
      .then((response) => {
        const data = response.data.data.docs;
        setTagsList(data);
      })
      .catch((err) => console.log(err));
  };

  const getAllUsers = () => {
    axios
      .get("/api/v1/user", {
        withCredentials: true,
      })
      .then((response) => {
        setCustomers(response.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Something went wrong ! Try again Later");
      });
  };

  useEffect(() => {
    getProject();
    getAllTags();
    getAllUsers();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updateProject = (event) => {
    event.preventDefault();
    let tags = selectedTags;
    let collaborators = selectedCollaborators;

    axios
      .patch(`/api/v1/project/${project._id}`, {
        ...values,
        tags,
        collaborators,
      })
      .then((response) => {
        if (response.status === 200) {
          const confirm = window.confirm("Project Updated Successfully");
          if (confirm) {
            history.push(`/projects/${project._id}`);
          }
        } else {
          window.alert("Failed to Add Project! Try Again after some time");
        }
      });
  };

  const hideTagsPane = () => {
    setShowTagsPane(false);
  };
  const showTags = () => {
    setCollaboratorsPane(false);
    setShowTagsPane(true);
  };

  const getSelectedTags = (tagsSelected) => {
    setSelectedTags(tagsSelected);
    setShowTagsPane(false);
  };

  const showCollaboratorsPane = () => {
    setShowTagsPane(false);
    setCollaboratorsPane(true);
  };

  const hideCollaboratorsPane = () => {
    setCollaboratorsPane(false);
  };

  const getSelectedCollaborators = (collaboratorSelected) => {
    setSelectedCollaborators(collaboratorSelected);
    setCollaboratorsPane(false);
  };

  const checkRequiredFields = () => {
    return !(
      values.title &&
      values.description &&
      values.communication &&
      values.preRequisite &&
      values.duration
    );
  };

  let form = null;

  if (project && tagsList.length > 0 && customers.length > 0)
    form = (
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
                        Edit Current Project
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={showTags}
                      >
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
                                      label={collaborator.name}
                                      avatar={
                                        <Avatar src={collaborator.image} />
                                      }
                                      style={{ color: "black!important" }}
                                    />
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
                <br />
                <Button
                  color="primary"
                  style={{
                    marginLeft: "40%",
                    marginRight: "40%",
                    marginTop: "2%",
                    marginBottom: "2%",
                  }}
                  classes={{ root: classes.buttonRootDark }}
                  variant="contained"
                  disabled={checkRequiredFields()}
                  onClick={(e) => {
                    updateProject(e);
                  }}
                >
                  Update
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
          <Collaborators
            currentUser={user}
            customers={customers}
            hide={hideCollaboratorsPane}
            initialSelectedCollaborators={selectedCollaborators}
            getCollaboraters={getSelectedCollaborators}
          />
        </Container>
      ) : null}
    </>
  );
};

export default EditProject;
