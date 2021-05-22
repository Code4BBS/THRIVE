import React, { useState } from "react";
import TagList from "./TagsList";
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
import TextField from "@material-ui/core/TextField";
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";

// core components
import UserHeader from "../../components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";
import Chip from "@material-ui/core/Chip";
import axios from "axios";

const useStyles = makeStyles(componentStyles);

function Profile({ user }) {
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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const postProject = (event) => {
    event.preventDefault();
    axios.post("/api/v1/project", { ...values }).then((response) => {
      // console.log(response);
      if (response.status === 201) {
        let confirm = window.confirm("Project Added Successfully");
        if (confirm) {
          window.location.href = "/admin/projects";
        }
      } else {
        window.alert("Failed to Add Project! Try Again after some time");
      }
    });
  };

  function getAllTags() {
    let data = ["hello"];
    axios
      .get("/api/v1/user/tag", { withCredentials: true })
      .then((response) => {
        data = response.data.data.docs;
        console.log("response");
        setTagsList(data);
        setShowTagsPane(true);
      })
      .catch((err) => console.log(err));
  }
  const hideTagsPane = () => {
    setShowTagsPane(false);
  };
  const showTags = () => {
    getAllTags();
  };

  const getSelectedTags = (tagsSelected) => {
    console.log(tagsSelected);
    setSelectedTags(tagsSelected);
    setShowTagsPane(false);
  };
  return (
    <>
      <UserHeader user={user} />
      {/* Page content */}
      {!tagsPane ? (
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
                              // className={classes.textAreaRoot}
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
                              type="text"
                              value={values.preRequisite}
                              label="Pre Requisite"
                              name="preRequisite"
                              onChange={handleChange}
                              disabled={preRequisite}
                            />
                          </FormControl>
                          <FormHelperText variant="outlined">
                            E.g. Python is required skill.
                          </FormHelperText>

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
                              labelPlacement="right"
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
                              type="text"
                              value={values.duration}
                              label="Duration"
                              name="duration"
                              onChange={handleChange}
                              disabled={duration}
                            />
                          </FormControl>
                          <FormHelperText variant="outlined">
                            E.g. 1 month from June 2021
                          </FormHelperText>

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
                              labelPlacement="right"
                              classes={{ label: classes.checkBoxLabel }}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </div>
                  <Grid item xs={12} lg={6} style={{ marginBottom: "10px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={showTags}
                    >
                      Select Tags
                    </Button>
                    <div style={{ marginTop: "5px" }}>
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
                                    variant="outlined"
                                    size="small"
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
                              fullWidth
                              multiline
                              rows="4"
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
      ) : (
        <Container>
          <TagList
            tags={tagsList}
            hide={hideTagsPane}
            getTags={getSelectedTags}
            tagsSelected={selectedTags}
          />
        </Container>
      )}
    </>
  );
}

export default Profile;
