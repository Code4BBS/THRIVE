import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@material-ui/core";

import TagGroup from "./TagGroup";
import UserHeader from "../../components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

import axios from "axios";

import { clone } from "ramda";

const useStyles = makeStyles(componentStyles);

const singleTags = ["Program", "Admission Year", "Branch"];

const branches = [
  {
    value: "Not Specified",
    label: "Not Specified",
  },
  {
    value: "CSE",
    label: "CSE",
  },
  {
    value: "ECE",
    label: "ECE",
  },
  {
    value: "EE",
    label: "EE",
  },
  {
    value: "ME",
    label: "ME",
  },
  {
    value: "CE",
    label: "CE",
  },
  {
    value: "MM",
    label: "MM",
  },
  {
    value: "SBS",
    label: "SBS",
  },
  {
    value: "SEOCS",
    label: "SEOCS",
  },
  {
    value: "SHSS&M",
    label: "SHSS&M",
  },
];
const programs = [
  {
    value: "Not Specified",
    label: "Not Specified",
  },
  {
    value: "B.Tech",
    label: "B.Tech",
  },
  {
    value: "Dual Degree",
    label: "Dual Degree",
  },
  {
    value: "M.Tech",
    label: "M.Tech",
  },
  {
    value: "MSc",
    label: "MSc",
  },
  {
    value: "Ph.D",
    label: "Ph.D",
  },
];

function Profile({ user, getUserAgain }) {
  const classes = useStyles();
  const theme = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState(user);

  const [error, setError] = useState({ rollNumber: false });
  const [errorCount, setErrorCount] = useState(0);

  const [tagGroups, setTagGroups] = useState([]);
  const [restTags, setRestTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [sortedTags, setSortedTags] = useState([]);

  let tagMap = {};
  let tagMapArray = [];
  if (updatedData.tags) {
    for (let tag of updatedData.tags) {
      tagMap[tag.group] = [];
    }
    for (let tag of updatedData.tags) {
      tagMap[tag.group].push(tag);
    }
    for (let group in tagMap) {
      tagMapArray.push({ name: group, tags: tagMap[group] });
    }
  }

  useEffect(() => {
    if (editMode) getAllTags();
  }, [editMode]);

  const displayFilterPane = () => {
    setSelectedTags([]);
    let tagMap = {};
    for (let tag of restTags) {
      tagMap[tag.group] = [];
    }
    for (let tag of restTags) {
      tagMap[tag.group].push(tag);
    }
    let tagMapArray = [];
    for (let group in tagMap) {
      tagMapArray.push({ name: group, tags: tagMap[group] });
    }
    setSortedTags(tagMapArray);
    setFilterVisibility(true);
  };

  const hideFilterPane = () => {
    setSelectedTags([]);
    setFilterVisibility(false);
  };

  const getAllTags = () => {
    axios
      .get("/api/v1/user/tag", {
        withCredentials: true,
      })
      .then((response) => {
        let rest = response.data.data.docs.filter((tag) => {
          return !updatedData.tags.map((el) => el._id).includes(tag._id);
        });
        setRestTags(rest);
        let tagMap = {};
        for (let tag of rest) {
          tagMap[tag.group] = [];
        }
        for (let tag of rest) {
          tagMap[tag.group].push(tag);
        }
        setTagGroups(tagMap);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (tagID) => {
    let wanted;
    let curr = { ...updatedData };
    curr.tags = curr.tags.filter((tag) => {
      if (tag._id === tagID) {
        wanted = tag;
        return false;
      }
      return true;
    });
    setUpdatedData(curr);
    let rest = [...restTags];
    rest.push(wanted);
    setRestTags(rest);
  };

  const addToSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    newSelection.push(tagID);
    setSelectedTags(newSelection);
  };

  const removeFromSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    let index = newSelection.indexOf(tagID);
    newSelection.splice(index, 1);
    setSelectedTags(newSelection);
  };

  const addSelectedTags = () => {
    let rest = restTags;
    rest = rest.filter((tag) => {
      return !selectedTags.map((el) => el._id).includes(tag._id);
    });
    setRestTags(rest);

    let curr = updatedData;
    selectedTags.forEach((tag) => {
      curr.tags.push(tag);
    });
    setUpdatedData(curr);

    setFilterVisibility(false);
  };

  const updateUser = () => {
    if (updatedData === user) return;
    axios
      .patch("/api/v1/user/profile", {
        rollNumber: updatedData.rollNumber,
        bio: updatedData.bio,
        tags: updatedData.tags,
        branch: updatedData.branch,
        program: updatedData.program,
      })
      .then((res) => {
        getUserAgain();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let studentInfo = null;
  let studentInfoCard = null;
  if (user && (user.role === "user" || user.role === "admin")) {
    studentInfo = (
      <div className={classes.plLg4}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <FormGroup>
              <FormLabel style={error.rollNumber ? { color: "red" } : {}}>
                Roll Number
              </FormLabel>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
                disabled={!editMode}
              >
                <Box
                  paddingLeft="0.75rem"
                  paddingRight="0.75rem"
                  component={FilledInput}
                  autoComplete="off"
                  type="text"
                  onChange={(event) => {
                    let curr = { ...updatedData };
                    curr.rollNumber = event.target.value;
                    setUpdatedData(curr);
                    if (event.target.value === "") {
                      let err = { ...error };
                      err.rollNumber = true;
                      setError(err);
                      setErrorCount(errorCount + 1);
                    } else if (error.rollNumber) {
                      let err = { ...error };
                      err.rollNumber = false;
                      setError(err);
                      setErrorCount(errorCount - 1);
                    }
                  }}
                  defaultValue={updatedData.rollNumber}
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormGroup>
              <FormLabel>Branch</FormLabel>
              <FormControl
                disabled={!editMode}
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
              >
                <Select
                  value={
                    updatedData.branch ? updatedData.branch : "Not Specified"
                  }
                  onChange={(event) => {
                    let curr = { ...updatedData };
                    curr.branch = event.target.value;
                    setUpdatedData(curr);
                  }}
                >
                  {branches.map((branch, id) => {
                    return (
                      <MenuItem key={id} value={branch.value}>
                        {branch.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormGroup>
              <FormLabel>Program</FormLabel>
              <FormControl
                disabled={!editMode}
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
              >
                <Select
                  value={
                    updatedData.program ? updatedData.program : "Not Specified"
                  }
                  onChange={(event) => {
                    let curr = { ...updatedData };
                    curr.program = event.target.value;
                    setUpdatedData(curr);
                  }}
                >
                  {programs.map((program, id) => {
                    return (
                      <MenuItem key={id} value={program.value}>
                        {program.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
      </div>
    );

    studentInfoCard = (
      <React.Fragment>
        <Box
          component={Typography}
          variant="h5"
          fontWeight="300!important"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {user.branch + " " + user.program}
        </Box>
        <Box
          component={Typography}
          variant="h4"
          fontWeight="300!important"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {user.rollNumber}
        </Box>
        {updatedData.bio ? (
          [
            <Box
              component={Divider}
              marginTop="1.5rem!important"
              marginBottom="1.5rem!important"
            ></Box>,
            <Box
              component="p"
              fontWeight="300"
              lineHeight="1.7"
              marginBottom="1rem"
              fontSize="1rem"
            >
              {user.bio}
            </Box>,
          ]
        ) : (
          <Chip
            size="small"
            style={{
              width: "250px",
              margin: "auto",
            }}
            label="No bio added yet"
          />
        )}
      </React.Fragment>
    );
  }

  return (
    <>
      <UserHeader user={user} />
      {/* Page content */}
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
                        Your Account
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            if (editMode) updateUser();
                            setEditMode(!editMode);
                          }}
                          disabled={errorCount > 0}
                          // style={
                          //   errorCount > 0 ? { backgroundColor: "grey" } : {}
                          // }
                        >
                          {editMode ? "Update" : "Edit"}
                        </Button>
                      </Box>
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
                  User Information
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Username</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue={user.name}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="email"
                            defaultValue={user.email}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                {studentInfo}
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="0px!important"
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
                  About you
                </Box>
                <div className={classes.plLg4}>
                  {editMode ? (
                    <Grid container>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormLabel>Bio</FormLabel>

                          <FormControl
                            disabled={!editMode}
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              multiline
                              value={updatedData.bio}
                              rows="3"
                              onChange={(event) => {
                                if (
                                  event.target.value.length > 200 ||
                                  / {2}/.test(event.target.value) ||
                                  event.target.value.startsWith(" ")
                                )
                                  return;
                                let curr = { ...updatedData };
                                curr.bio = event.target.value;
                                setUpdatedData(curr);
                              }}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel>Skills & Interests</FormLabel>
                        {!filterVisibility ? (
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TableContainer
                              style={{
                                backgroundColor: "white",
                                borderRadius: ".375rem",
                                boxShadow:
                                  "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                              }}
                            >
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                                style={{ margin: "10px 0px 0px 0px" }}
                              >
                                <TableBody>
                                  {user.tags !== undefined &&
                                  user.tags.length !== 0 ? (
                                    tagMapArray
                                      .sort((a, b) => {
                                        if (a.name < b.name) return -1;
                                        return 1;
                                      })
                                      .map((group, index) => {
                                        return [
                                          <TableRow
                                            key={`type${index}`}
                                            className={classes.cellBA}
                                          >
                                            &nbsp;&nbsp;&nbsp;&nbsp;{group.name}
                                          </TableRow>,
                                          <TableRow key={`tags${index}`}>
                                            <TableCell style={{ border: 0 }}>
                                              {group.tags.map((tag, index) => {
                                                if (editMode)
                                                  return (
                                                    <Chip
                                                      size="small"
                                                      key={
                                                        tag.group +
                                                        " " +
                                                        tag.name
                                                      }
                                                      className={classes.chip}
                                                      variant="outlined"
                                                      color="primary"
                                                      style={{
                                                        marginRight: "3px",
                                                      }}
                                                      label={tag.name}
                                                      onDelete={() => {
                                                        handleDelete(tag._id);
                                                      }}
                                                    />
                                                  );
                                                return (
                                                  <Chip
                                                    size="small"
                                                    key={
                                                      tag.group + " " + tag.name
                                                    }
                                                    className={classes.chip}
                                                    variant="outlined"
                                                    color="primary"
                                                    style={{
                                                      marginRight: "3px",
                                                    }}
                                                    label={tag.name}
                                                  />
                                                );
                                              })}
                                            </TableCell>
                                          </TableRow>,
                                        ];
                                      })
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ border: 0 }}
                                      >
                                        <Chip label="No tags available, update profile to see" />
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <br />
                            {editMode ? (
                              <Button
                                style={{
                                  margin: "auto",
                                  padding: "5px 8px 3px 8px",
                                }}
                                onClick={() => {
                                  displayFilterPane();
                                }}
                              >
                                ADD TAGS
                              </Button>
                            ) : null}
                          </Box>
                        ) : (
                          <Box style={{ width: "100%" }}>
                            <TableContainer
                              style={{
                                backgroundColor: "white",
                                borderRadius: ".375rem",
                                width: "100%",
                                boxShadow:
                                  "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                              }}
                            >
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                                style={{ margin: "10px 0px 0px 0px" }}
                              >
                                <TableBody>
                                  {sortedTags.map((group, index) => {
                                    if (singleTags.includes(group.name))
                                      return null;
                                    return (
                                      <TagGroup
                                        key={index}
                                        classes={classes}
                                        tagGroup={group.name}
                                        tags={group.tags}
                                        addToSelected={addToSelected}
                                        removeFromSelected={removeFromSelected}
                                      />
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                margin: "5px 0px",
                              }}
                            >
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={addSelectedTags}
                                style={{
                                  minWidth: "0px",
                                  lineHeight: 0,
                                  padding: "15px",
                                }}
                              >
                                ADD
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={hideFilterPane}
                                sstyle={{
                                  minWidth: "0px",
                                  lineHeight: 0,
                                  padding: "15px",
                                }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </Box>
                        )}
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={user.image}
                      alt="..."
                      maxWidth="180px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>

              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Box textAlign="center" style={{ marginTop: "75px" }}>
                  <Typography variant="h3">{user.name}</Typography>
                  {studentInfoCard}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
