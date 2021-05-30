import React, { useEffect, useState } from "react";

import "./Button.css";

import { useHistory } from "react-router-dom";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Container,
  CardHeader,
  CardContent,
  Button,
  Divider,
  FormControl,
  FilledInput,
  Chip,
  Avatar,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
  Paper,
} from "@material-ui/core";

import EventIcon from "@material-ui/icons/Event";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import axios from "axios";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import Header from "components/Headers/Header";
const useStyles = makeStyles(componentStyles);

const AssignmentView = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  let id = window.location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(true);

  const [assignment, setAssignment] = useState([]);
  const [filename, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [submittedFile, setSubmittedFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedFileUrl, setSubmittedFileUrl] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  const getAssignment = () => {
    axios
      .get(`/api/v1/course/assignment/${id}`)
      .then((res) => {
        setAssignment(res.data.data);
        setFileName(res.data.data.assignmentFileName);
        let data = res.data.data.students;
        for (let i of Object.keys(data)) {
          data[i].fileUrl = "";
        }
        setSubmittedAssignments(data);

        let assignment = res.data.data;

        let index = assignment.students.findIndex(
          (el) => el.user.id == user._id
        );
        if (index != -1) {
          setSubmittedFile(assignment.students[index]["fileName"]);
          setSubmitted(true);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  };

  const submitAssignment = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post(`/api/v1/course/submit/assignment/${id}`, formData)
      .then((res) => {
        setSubmittedFile(res.data.data);
        setSubmitted(true);
        alert("Assignment submiited");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFile = () => {
    axios
      .get(`/api/v1/course/assignment/open/${filename}`, {
        withCredentials: true,
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response.data);
        // console.log(response);
        const file = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        setFileUrl(fileURL);
        window.open(fileURL);
      });
  };

  const openSubmittedFile = () => {
    axios
      .get(`/api/v1/course/assignment/open/${submittedFile}`, {
        withCredentials: true,
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response.data);
        // console.log(response);
        const file = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        setSubmittedFileUrl(fileURL);
        window.open(fileURL);
      });
  };

  const openSubmittedAssignmentFile = (index) => {
    axios
      .get(
        `/api/v1/course/assignment/open/${submittedAssignments[index].fileName}`,
        {
          withCredentials: true,
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        console.log(response.data);
        // console.log(response);
        const file = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        submittedAssignments[index].fileUrl = fileUrl;
        setSubmittedAssignments(submittedAssignments);
        window.open(fileURL);
      });
  };

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    getAssignment();
  }, []);

  const teacherView = (
    <Box component="span" m={1}>
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Submissions
      </Typography>
      <br />
      {submittedAssignments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Submitted at</TableCell>
                <TableCell>Assignment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedAssignments.map((assignment, ind) => {
                return (
                  <TableRow>
                    <TableCell>{assignment.user.email}</TableCell>
                    <TableCell>
                      {assignment.submittedAt || "29 May,2021"}
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ display: "flex" }}
                        onClick={() => {
                          if (assignment.fileUrl == "")
                            openSubmittedAssignmentFile(ind);
                          else window.open(assignment.fileUrl);
                        }}
                      >
                        <DescriptionIcon fontSize="large" color="primary" />
                        <Typography style={{ padding: "0px" }}>
                          &nbsp;{assignment.user.name}
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  );
  return (
    <>
      <Header />
      {assignment != null && !isLoading ? (
        <Container
          maxWidth={false}
          component={Box}
          marginTop="-6rem"
          classes={{ root: classes.containerRoot }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            container
            style={{
              width: "100%",
            }}
            component={Box}
          >
            <Grid item xs={12}>
              <Card
                classes={{
                  root: classes.cardRoot,
                }}
              >
                <CardHeader
                  title={
                    <div style={{ display: "flex" }}>
                      <AssignmentIcon
                        fontSize="large"
                        color="primary"
                        style={{
                          height: "28px",
                          width: "28px",
                          margin: "10px",
                        }}
                      />
                      <Typography
                        style={{
                          fontSize: "20px",
                          padding: "10px 0px",

                          fontWeight: "bold",
                        }}
                      >
                        {assignment.name}
                      </Typography>
                    </div>
                  }
                  subheader={
                    assignment.courseId ? (
                      <div>
                        <Typography
                          style={{
                            margin: "0px 0px 0px 12px",
                            padding: 0,
                            fontWeight: 600,
                          }}
                        >
                          {assignment.courseId.name.toUpperCase()} -{" "}
                          {assignment.courseId.courseCode}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "9px",
                            flexWrap: "wrap",
                          }}
                        >
                          {assignment.teacher ? (
                            <Chip
                              icon={
                                <Avatar
                                  src={assignment.teacher.image}
                                  style={{ height: "24px", width: "24px" }}
                                />
                              }
                              style={{ fontSize: "15px", margin: "10px 0px" }}
                              variant="outlined"
                              label={assignment.teacher.name}
                            />
                          ) : (
                            ""
                          )}{" "}
                          &nbsp;| &nbsp;{assignment.due || "May 26 "}
                          &emsp;&emsp;
                          <EventIcon
                            style={{ height: "20px", width: "20px" }}
                          />
                          <Typography>
                            &nbsp;&nbsp;Due {assignment.deadline || "May 30"}
                          </Typography>
                        </div>
                      </div>
                    ) : null
                  }
                ></CardHeader>
                <CardContent>
                  <Button
                    style={{ display: "flex" }}
                    onClick={() => {
                      if (fileUrl == "") openFile();
                      else window.open(fileUrl);
                    }}
                  >
                    <DescriptionIcon
                      fontSize="large"
                      color="primary"
                      style={{ height: "22px", width: "22px" }}
                    />
                    <Typography style={{ padding: "0px" }}>
                      &nbsp;View Assignment
                    </Typography>
                  </Button>
                  <Divider style={{ marginTop: "20px" }} />
                  <Box component="span" m={1}>
                    {user.role != "Teacher" ? (
                      <>
                        {submitted ? (
                          <>
                            <Typography
                              style={{ marginBottom: "10px", fontSize: "14px" }}
                            >
                              YOUR SUBMISSION
                            </Typography>
                            <Button
                              style={{ display: "flex" }}
                              onClick={() => {
                                if (submittedFileUrl == "") openSubmittedFile();
                                else window.open(submittedFileUrl);
                              }}
                            >
                              <DescriptionIcon
                                fontSize="large"
                                color="primary"
                              />
                              <Typography style={{ padding: "0px" }}>
                                &nbsp;View Submission
                              </Typography>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Typography>Submit Assignment</Typography>
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
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                                style={{
                                  marginLeft: "10px",
                                  overflow: "hidden",
                                }}
                              >
                                {selectedFile.name}
                              </Typography>
                            </div>
                            <Button
                              color="primary"
                              style={{ marginLeft: "40%", marginRight: "40%" }}
                              classes={{ root: classes.buttonRootDark }}
                              variant="contained"
                              disabled={!selectedFile}
                              onClick={(e) => {
                                submitAssignment(e);
                                // window.alert("clicked");
                              }}
                            >
                              Submit
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      teacherView
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "40px 0px",
          }}
        >
          <CircularProgress />
        </div>
      ) : null}
    </>
  );
};

export default AssignmentView;
