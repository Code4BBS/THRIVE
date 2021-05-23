import React, { useState, useEffect } from "react";

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
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// @material-ui/icons components
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// core components
import Header from "../../../components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import Chip from "@material-ui/core/Chip";
import axios from "axios";

const useStyles = makeStyles(componentStyles);

function Profile({ user }) {
  const classes = useStyles();
  const theme = useTheme();

  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);

  const [requestNote, setRequestNote] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setRequestNote(event.target.value);
  };

  const requestJoin = () => {
    const request = {
      requester: user._id,
      note: requestNote,
    };
    setOpen(false);
    if (project) {
      axios
        .put(`/api/v1/project/request/${project._id}/join`, request)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            window.alert("Request Sent Successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          window.alert("Something went wrong! Try again Later");
        });
    } else {
      window.alert("Something went wrong! Try again Later");
    }
  };

  const acceptRequest = (request, index) => {
    if (project) {
      axios
        .put(
          `/api/v1/project/request/${project._id}/accpet?id=${request.requester._id}`
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const updatedProject = project;
            const updatedRequests = [...updatedProject.requests];
            updatedRequests.splice(index, 1);
            const updatedCollaborators = [...updatedProject.collaborators];
            updatedCollaborators.push(request.requester);

            updatedProject.requests = updatedRequests;
            updatedProject.collaborators = updatedCollaborators;

            setProject(updatedProject);
            window.alert("Request Accepted Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("Something went wrong! Try again Later");
        });
    } else {
      window.alert("Something went wrong ! Try again Later");
    }
  };

  const rejectRequest = (request, index) => {
    if (project) {
      axios
        .put(
          `/api/v1/project/request/${project._id}/reject?id=${request.requester._id}`
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const updatedProject = project;
            const updatedRequests = [...updatedProject.requests];
            updatedRequests.splice(index, 1);

            updatedProject.requests = updatedRequests;

            setProject(updatedProject);

            window.alert("Reject Successful");
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("Something went wrong! Try again Later");
        });
    } else {
      window.alert("Something went wrong ! Try again Later");
    }
  };

  // const [isLoading, setLoading] = useState(true);

  const getProject = () => {
    let url = window.location.pathname.split("/");
    let projectId = url[3];
    axios
      .get(`/api/v1/project/${projectId}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setProject(response.data.data.project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getProject();
  // }, []);

  const dummyTags = [
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
    { _id: "dummy", name: "Node.js" },
  ];

  const dummyUsers = [
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    {
      _id: "dummy",
      name: "Shrirang",
      image: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
  ];

  const dummyRequests = [
    {
      requester: {
        _id: "dummy",
        name: "Shrirang",
        image: "https://avatars.githubusercontent.com/u/64681029?v=4",
      },
      message: "I am willing to contribute",
    },
    {
      requester: {
        _id: "dummy",
        name: "Shrirang",
        image: "https://avatars.githubusercontent.com/u/64681029?v=4",
      },
      message: "I am willing to contribute",
    },
    {
      requester: {
        _id: "dummy",
        name: "Shrirang",
        image: "https://avatars.githubusercontent.com/u/64681029?v=4",
      },
      message: "I am willing to contribute",
    },
    {
      requester: {
        _id: "dummy",
        name: "Shrirang",
        image: "https://avatars.githubusercontent.com/u/64681029?v=4",
      },
      message: "I am willing to contribute",
    },
  ];

  let modal = (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <h2 style={{ textAlign: "center" }}> Request to Collaborate</h2>

        <FormGroup>
          <FormLabel>Note</FormLabel>
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
              label="Request Note"
              name="requestNote"
              placeholder="Add request message to join"
              onChange={handleChange}
              required
              value={requestNote}
              variant="filled"
            />
          </FormControl>
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={requestJoin} color="primary">
          Send Request
        </Button>

        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

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
              classes={{ root: classes.cardHeaderRoot }}
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
                      Project Title
                    </Box>
                  </Grid>
                  <Grid item xs="auto">
                    <Box
                      justifyContent="flex-end"
                      display="flex"
                      flexWrap="wrap"
                    >
                      <IconButton
                        color="primary"
                        variant="contained"
                        component="span"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        variant="contained"
                        component="span"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              }
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
                  <Grid item xs="auto">
                    <Box component={Typography} variant="h5" display="inline">
                      Owner &nbsp;&nbsp;
                    </Box>
                    <Chip
                      variant="outlined"
                      label={user.name}
                      avatar={<Avatar src={user.image} />}
                      style={{
                        color: "black!important",
                      }}
                    />
                    <br />
                    <br />
                  </Grid>

                  <Grid item xs={12} lg={12} style={{ marginBottom: "10px" }}>
                    <Box component={Typography} variant="h5">
                      Collaborators &nbsp;&nbsp;
                    </Box>

                    {dummyUsers.length > 0
                      ? dummyUsers.map((collaborator, index) => {
                          return (
                            <li
                              key={index}
                              style={{ display: "inline", margin: "3px" }}
                            >
                              <Chip
                                variant="outlined"
                                label={collaborator.name}
                                avatar={<Avatar src={collaborator.image} />}
                                style={{ color: "black!important" }}
                              />
                            </li>
                          );
                        })
                      : null}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    lg={12}
                    style={{ marginBottom: "1rem!important" }}
                  >
                    <br />
                    <Box component={Typography} variant="h5">
                      Description &nbsp;&nbsp;
                    </Box>
                    <p
                      style={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                        paddingLeft: "1%",
                        paddingRight: "1%",
                      }}
                    >
                      Description includes the idea of the project and what you
                      intend to do. Any other specific requirements like only
                      specific year's or branch's should be mentioned here.
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <br />

                    <Box component={Typography} variant="h5">
                      Pre Requisite &nbsp;&nbsp;
                    </Box>

                    <span
                      style={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                        paddingLeft: "1%",
                        paddingRight: "1%",
                      }}
                    >
                      Python is necessary
                    </span>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <br />

                    <Box component={Typography} variant="h5">
                      Duration &nbsp;&nbsp;
                    </Box>

                    <span
                      style={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                        paddingLeft: "1%",
                        paddingRight: "1%",
                      }}
                    >
                      2 Days: 23/06/2021 and 24/06/2021
                    </span>
                  </Grid>

                  <Grid item xs={12} lg={12} style={{ marginBottom: "10px" }}>
                    <br />
                    <br />
                    <Box component={Typography} variant="h5">
                      Tags &nbsp;&nbsp;
                    </Box>

                    {dummyTags.length > 0
                      ? dummyTags.map((tag, index) => {
                          return (
                            <li
                              key={index}
                              style={{
                                display: "inline",
                                margin: "3px",
                              }}
                            >
                              <Chip
                                variant="default"
                                // size="small"
                                label={tag.name}
                                color="primary"
                                style={{ marginBottom: "5px!important" }}
                              />
                            </li>
                          );
                        })
                      : null}
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
                    <span
                      style={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                      }}
                    >
                      Contact on WhatsApp 12345567890
                    </span>
                  </Grid>
                </Grid>
              </div>

              <Box
                component={Divider}
                marginBottom="0.8rem!important"
                marginTop="0.8rem!important"
              />
              {dummyRequests.length > 0 ? (
                <>
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
                    Join Requests
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <Grid item xs={12} lg={12}>
                        <TableContainer>
                          <Box
                            component={Table}
                            alignItems="center"
                            marginBottom="0!important"
                          >
                            <TableBody>
                              {dummyRequests.map((request, id) => (
                                <TableRow>
                                  <TableCell
                                    style={{ verticalAlign: "middle" }}
                                    key={id}
                                  >
                                    <Chip
                                      variant="outlined"
                                      label={request.requester.name}
                                      avatar={
                                        <Avatar src={request.requester.image} />
                                      }
                                      style={{ color: "black!important" }}
                                    />
                                  </TableCell>

                                  <TableCell
                                    style={{ verticalAlign: "middle" }}
                                  >
                                    <Box component="span">
                                      <span display="inline">
                                        {request.note}
                                      </span>
                                    </Box>
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      verticalAlign: "middle",
                                      padding: "0",
                                    }}
                                  >
                                    <Box>
                                      <IconButton
                                        color="primary"
                                        variant="contained"
                                        component="span"
                                        onClick={() =>
                                          acceptRequest(request, id)
                                        }
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        color="primary"
                                        variant="contained"
                                        component="span"
                                        onClick={() =>
                                          rejectRequest(request, id)
                                        }
                                      >
                                        <DeleteOutlineIcon />
                                      </IconButton>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Box>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </div>
                </>
              ) : null}
            </CardContent>

            <Divider />

            <Grid item xs="auto">
              <Box alignItems="flex-end" display="flex" flexWrap="wrap">
                <Button
                  size="small"
                  variant="contained"
                  component="span"
                  classes={{ root: classes.buttonRootDark }}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Request to Join
                </Button>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Header />

      {form}
      {modal}
    </>
  );
}

export default Profile;
