import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import {
  Avatar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  FormGroup,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@material-ui/core";

// @material-ui/icons

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MoreVert from "@material-ui/icons/MoreVert";

import componentStyles from "assets/theme/views/admin/tables.js";

import getInitials from "./../customer/CustomerListView/getInitials";

const useStyles = makeStyles(componentStyles);

const Enrolled = ({ user, history, course }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [anchorId, setAnchorId] = React.useState(null);
  const [currentAnchor, setCurrentAnchor] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [students, setStudents] = React.useState([]);
  const [email, setStudentEmail] = React.useState("");
  const handleMenuClick = (event, index) => {
    setCurrentAnchor(event.currentTarget);
    setAnchorId(index);
  };

  const handleMenuClose = () => {
    setAnchorId(null);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (event) => {
    setStudentEmail(event.target.value);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const headers = ["Name", "Email", "Roll", "Branch"];

  if (user && user.role === "Teacher") {
    headers.push("");
  }

  const getStudentsOfCourse = () => {
    axios.get(`/api/v1/course/students/${course._id}`).then((response) => {
      const students = response.data.data;
      setStudents(students);
      setLoading(false);
    });
  };

  const enrollStudent = () => {
    axios
      .post(`/api/v1/course/enroll/${course._id}`, { studentEmail: email })
      .then((response) => {
        const student = response.data.student;
        const newStudents = [...students];
        newStudents.push(student);
        setStudents(newStudents);
        setStudentEmail("");

        alert("Student enrolled");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong, unable to enroll student");
      });
  };
  useEffect(() => {
    getStudentsOfCourse();
  }, []);

  return (
    <>
      <Grid
        item
        style={{
          width: "100%",
        }}
        component={Box}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
            title={
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
                    {isLoading ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      "Enrolled Students"
                    )}
                  </Box>
                </Grid>
                <Grid item xs="auto">
                  <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                      style={{ boxShadow: "none" }}
                    >
                      <AccordionSummary
                        //   expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          style={{ marginTop: "0.25rem" }}
                        >
                          Enroll students to course
                        </Button>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid item xs="auto" style={{ marginLeft: "-0.5rem" }}>
                          <FormGroup>
                            <FormLabel>Student email</FormLabel>
                            <FormControl
                              variant="filled"
                              width="50%"
                              style={{
                                marginBottom: "1rem!important",
                              }}
                              required
                            >
                              <Input
                                style={{
                                  paddingLeft: "0.75rem",
                                  paddingRight: "0.75rem",
                                  width: "75%",
                                }}
                                type="email"
                                required
                                label="Course Name"
                                name="name"
                                onChange={handleInputChange}
                                value={email}
                                classes={{ input: classes.searchInput }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={enrollStudent}
                                      disabled={!email}
                                    >
                                      <CheckCircleIcon
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
              </Grid>
            }
          ></CardHeader>
          {students && students.length > 0 ? (
            <>
              <TableContainer>
                <PerfectScrollbar>
                  <Box
                    component={Table}
                    alignItems="center"
                    marginBottom="0!important"
                  >
                    <TableHead>
                      <TableRow>
                        {headers.map((header, i) => {
                          return (
                            <TableCell
                              key={i}
                              classes={{
                                root:
                                  classes.tableCellRoot +
                                  " " +
                                  classes.tableCellRootHead,
                              }}
                            >
                              {header}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students &&
                        students
                          .slice(page * limit, (page + 1) * limit)
                          .map((student, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell
                                  classes={{
                                    root:
                                      classes.tableCellRoot +
                                      " " +
                                      classes.tableCellRootBodyHead,
                                  }}
                                  component="th"
                                  variant="head"
                                  scope="row"
                                >
                                  <Box
                                    alignItems="center"
                                    display="flex"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    <Avatar
                                      className={classes.avatar}
                                      src={student.image}
                                    >
                                      {getInitials(student.name)}
                                    </Avatar>
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                      style={{ letterSpacing: 0 }}
                                    >
                                      {student.name.toLowerCase()}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell
                                  classes={{
                                    root:
                                      classes.tableCellRoot +
                                      " " +
                                      classes.tableCellRootBodyHead,
                                  }}
                                  component="th"
                                  variant="head"
                                  scope="row"
                                >
                                  <Box alignItems="center" display="flex">
                                    <Box display="flex" alignItems="flex-start">
                                      <Box fontSize=".875rem" component="span">
                                        {student.email}
                                      </Box>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell
                                  classes={{
                                    root:
                                      classes.tableCellRoot +
                                      " " +
                                      classes.tableCellRootBodyHead,
                                  }}
                                  component="th"
                                  variant="head"
                                  scope="row"
                                >
                                  <Box alignItems="center" display="flex">
                                    <Box display="flex" alignItems="flex-start">
                                      <Box fontSize=".875rem" component="span">
                                        {student.rollNumber}
                                      </Box>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell
                                  classes={{ root: classes.tableCellRoot }}
                                >
                                  <Box alignItems="center" display="flex">
                                    <Box display="flex" alignItems="flex-start">
                                      <Box fontSize=".875rem" component="span">
                                        <a
                                          href={
                                            course.teacher._id === user._id
                                              ? `/user-profile`
                                              : `/${course.teacher._id}`
                                          }
                                          style={{ textDecoration: "none" }}
                                        >
                                          {student.branch}
                                        </a>
                                      </Box>
                                    </Box>
                                  </Box>
                                </TableCell>
                                {user && user.role === "admin" ? (
                                  <TableCell
                                    classes={{ root: classes.tableCellRoot }}
                                    align="right"
                                  >
                                    <Box
                                      aria-controls={`simple-menu-${index}`}
                                      aria-haspopup="true"
                                      onClick={(e) => handleMenuClick(e, index)}
                                      size="small"
                                      component={Button}
                                      width="2rem!important"
                                      height="2rem!important"
                                      minWidth="2rem!important"
                                      minHeight="2rem!important"
                                    >
                                      <Box
                                        component={MoreVert}
                                        width="1.25rem!important"
                                        height="1.25rem!important"
                                        position="relative"
                                        top="2px"
                                        color={theme.palette.gray[500]}
                                      />
                                    </Box>
                                    <Menu
                                      id={`simple-menu-${index}`}
                                      anchorEl={currentAnchor}
                                      keepMounted
                                      open={anchorId === index}
                                      onClose={handleMenuClose}
                                    >
                                      <MenuItem>Blacklist Project</MenuItem>
                                    </Menu>
                                  </TableCell>
                                ) : null}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Box>
                </PerfectScrollbar>
              </TableContainer>

              <TablePagination
                component="div"
                count={students.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
                SelectProps={{
                  variant: "outlined",
                  classes: {
                    select: classes.select,
                  },
                }}
              />
            </>
          ) : null}
        </Card>
      </Grid>
    </>
  );
};

export default Enrolled;
