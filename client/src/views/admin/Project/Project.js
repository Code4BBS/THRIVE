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
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

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
  const [requestNote, setRequestNote] = useState("");
  const [isLoading, setLoading] = useState(true);

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
        .patch(`/api/v1/project/request/${project._id}/join`, {
          request: request,
        })
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
        .patch(
          `/api/v1/project/request/${project._id}/accept?id=${request.requester._id}`
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            // const updatedProject = project;
            // const updatedRequests = [...updatedProject.requests];
            // updatedRequests.splice(index, 1);
            // const updatedCollaborators = [...updatedProject.collaborators];
            // updatedCollaborators.push(request.requester);

            // updatedProject.requests = updatedRequests;
            // updatedProject.collaborators = updatedCollaborators;
            setProject(response.data.data.project);
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

  const confirmAccept = (request, index) => {
    let confirm = window.confirm(
      `Are you sure you want to accept request of ${request.requester.name}?`
    );

    if (confirm) {
      acceptRequest(request, index);
    }
  };

  const rejectRequest = (request, index) => {
    if (project) {
      axios
        .patch(
          `/api/v1/project/request/${project._id}/reject?id=${request.requester._id}`
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            // const updatedProject = project;
            // const updatedRequests = [...updatedProject.requests];
            // updatedRequests.splice(index, 1);
            // updatedProject.requests = updatedRequests;
            setProject(response.data.data.project);
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

  const confirmReject = (request, index) => {
    let confirm = window.confirm(
      `Are you sure you want to reject request of ${request.requester.name}?`
    );

    if (confirm) {
      rejectRequest(request, index);
    }
  };

  const deleteProject = () => {
    if (project) {
      axios
        .delete(`/api/v1/project/${project._id}`)
        .then((response) => {
          if (response.status === 204) {
            window.alert("Project deleted successfully");
            window.location.href = `/admin/projects`;
          } else {
            window.alert("Something went wrong ! Try again Later");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const confirmDelete = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirm) {
      deleteProject();
    }
  };

  const getProject = () => {
    let url = window.location.pathname.split("/");
    let projectId = url[3];
    axios
      .get(`/api/v1/project/${projectId}`)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // console.log(response.data.data.project);
          setLoading(false);
          setProject(response.data.data.project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

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

  //owner settings

  let form = null;
  let editButtons = null;
  let joinRequests = null;
  let ownerLabel = null;
  let joinRequestButton = null;

  if (!isLoading && project) {
    //Owner settings
    ownerLabel = project.owner.name;
    if (project.owner._id === user._id) {
      ownerLabel = "You";

      editButtons = (
        <Grid item xs="auto">
          <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
            <IconButton
              color="primary"
              variant="contained"
              component="span"
              onClick={() =>
                (window.location.href = `/admin/project/edit/${project._id}`)
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="primary"
              variant="contained"
              component="span"
              onClick={() => confirmDelete()}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Grid>
      );

      joinRequests =
        project.requests.length > 0 ? (
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
                        {project.requests.map((request, id) => (
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

                            <TableCell style={{ verticalAlign: "middle" }}>
                              <Box component="span">
                                <span display="inline">{request.note}</span>
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
                                  onClick={() => confirmAccept(request, id)}
                                >
                                  <CheckIcon />
                                </IconButton>
                                <IconButton
                                  color="primary"
                                  variant="contained"
                                  component="span"
                                  onClick={() => confirmReject(request, id)}
                                >
                                  <ClearIcon />
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
        ) : null;
    }

    //Join Button Functionality
    const ownerCheck = project.owner._id === user._id;

    const requesterCheck = project.requests.findIndex(
      (request) => request.requester._id === user._id
    );

    const collaboratorCheck = project.collaborators.findIndex(
      (collaborator) => collaborator._id === user._id
    );

    if (!ownerCheck && collaboratorCheck === -1 && requesterCheck > -1) {
      joinRequestButton = (
        <Grid item xs="auto">
          <Box alignItems="flex-end" display="flex" flexWrap="wrap">
            <Button
              size="small"
              variant="outlined"
              component="span"
              classes={{ root: classes.buttonRootDark }}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Your Request is Registered
            </Button>
          </Box>
        </Grid>
      );
    } else if (
      !ownerCheck &&
      collaboratorCheck === -1 &&
      requesterCheck === -1
    ) {
      joinRequestButton = (
        <Grid item xs="auto">
          <Box alignItems="flex-end" display="flex" flexWrap="wrap">
            <Button
              size="small"
              variant="contained"
              component="span"
              // disabled={button}
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
      );
    }

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
                        {project.title}
                      </Box>
                    </Grid>
                    {editButtons}
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
                        label={ownerLabel}
                        avatar={<Avatar src={project.owner.image} />}
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

                      {project.collaborators.length > 0
                        ? project.collaborators.map((collaborator, index) => {
                            return (
                              <li
                                key={index}
                                style={{ display: "inline", margin: "3px" }}
                              >
                                <Chip
                                  variant="outlined"
                                  label={
                                    collaborator.name === user._id
                                      ? "You"
                                      : collaborator.name
                                  }
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
                        {project.description}
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
                        {project.preRequisite}
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
                        {project.duration}
                      </span>
                    </Grid>

                    <Grid item xs={12} lg={12} style={{ marginBottom: "10px" }}>
                      <br />
                      <br />
                      <Box component={Typography} variant="h5">
                        Tags &nbsp;&nbsp;
                      </Box>

                      {project.tags.length > 0
                        ? project.tags.map((tag, index) => {
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
                {joinRequests}
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
                        {project.communication}
                      </span>
                    </Grid>
                  </Grid>
                </div>

                <Box
                  component={Divider}
                  marginBottom="0.8rem!important"
                  marginTop="0.8rem!important"
                />
              </CardContent>

              <Divider />

              {joinRequestButton}
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Header />

      {form}
      {modal}
    </>
  );
}

export default Profile;
