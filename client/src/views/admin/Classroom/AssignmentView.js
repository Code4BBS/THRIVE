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
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import axios from "axios";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import Header from "components/Headers/Header";
const useStyles = makeStyles(componentStyles);

const AssignmentView = () => {
  const classes = useStyles();
  let id = window.location.pathname.split("/")[2];
  console.log(id);

  const [assignment, setAssignment] = useState([]);
  const [filename, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const getAssignment = () => {
    axios
      .get(`/api/v1/course/assignment/${id}`)
      .then((res) => {
        setAssignment(res.data.data);
        setFileName(res.data.data.assignmentFileName);
        console.log(res.data.data);
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
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        setFileUrl(fileURL);
        window.open(fileURL);
      });
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
