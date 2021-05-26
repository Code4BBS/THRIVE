import React, { useEffect, useState } from "react";

import "./Button.css";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  IconButton,
  Container,
  CardHeader,
  CardContent,
  Button,
  Divider,
  FormControl,
  FilledInput,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import axios from "axios";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import Header from "components/Headers/Header";
const useStyles = makeStyles(componentStyles);

const AssignmentView = ({ user }) => {
  const classes = useStyles();
  let id = window.location.pathname.split("/")[2];
  console.log(id);

  const [assignment, setAssignment] = useState([]);
  const [filename, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [submittedFile, setSubmittedFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedFileUrl, setSubmittedFileUrl] = useState("");

  const getAssignment = () => {
    axios
      .get(`/api/v1/course/assignment/${id}`)
      .then((res) => {
        setAssignment(res.data.data);
        setFileName(res.data.data.assignmentFileName);
        let assignment = res.data.data;
        let index = assignment.students.findIndex((el) => el.user == user._id);
        if (index != -1) {
          setSubmittedFile(assignment.students[index]["fileName"]);
          setSubmitted(true);
        }
      })
      .catch((err) => {
        console.log(err);
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

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    getAssignment();
  }, []);

  return (
    <>
      <Header />
      {assignment != null ? (
        <Container
          maxWidth={false}
          component={Box}
          marginTop="-6rem"
          classes={{ root: classes.containerRoot }}
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
                      <IconButton
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "40px",
                        }}
                      >
                        <AssignmentIcon fontSize="large" color="primary" />
                      </IconButton>
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
                    assignment ? (
                      <div style={{ display: "flex" }}>
                        <Typography>
                          {assignment.teacher ? assignment.teacher.name : ""} |{" "}
                          {assignment.due || "May 26 "}
                        </Typography>
                        <Typography style={{ marginLeft: "30px" }}>
                          Due date {assignment.due || "May 30"}
                        </Typography>
                      </div>
                    ) : null
                  }
                ></CardHeader>
                <CardContent>
                  <Box component="span" m={1}>
                    <Button
                      style={{ display: "flex" }}
                      onClick={() => {
                        if (fileUrl == "") openFile();
                        else window.open(fileUrl);
                      }}
                    >
                      <DescriptionIcon fontSize="large" color="primary" />
                      <Typography style={{ padding: "10px" }}>
                        View Assignment
                      </Typography>
                    </Button>
                  </Box>
                  <Divider />
                  <Box component="span" m={1}>
                    {submitted ? (
                      <>
                        <Typography>Submitted Assignment</Typography>
                        <Button
                          style={{ display: "flex" }}
                          onClick={() => {
                            if (submittedFileUrl == "") openSubmittedFile();
                            else window.open(submittedFileUrl);
                          }}
                        >
                          <DescriptionIcon fontSize="large" color="primary" />
                          <Typography style={{ padding: "10px" }}>
                            View Submitted Assignment
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
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </>
  );
};

export default AssignmentView;
