import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid, Typography } from "@material-ui/core";
// @material-ui/lab components
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons components
import MoreVert from "@material-ui/icons/MoreVert";

import Modal from "components/Custom/Modals/Modal.js";
import getInitials from "./../customer/CustomerListView/getInitials";
// core components
import Header from "../../../components/Headers/Header.js";
// import TagList from "./TagsList";

import axios from "axios";
import componentStyles from "assets/theme/views/admin/tables.js";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  FormGroup,
  FormControl,
  FormLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
const useStyles = makeStyles(componentStyles);

const Enrolled = ({ user, history, course }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [cardTitle, setCardTitle] = React.useState("Enrolled Students");
  const [addButton, showAddButton] = React.useState(false);
  const [anchorId, setAnchorId] = React.useState(null);
  const [currentAnchor, setCurrentAnchor] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [tagsPane, setShowTagsPane] = React.useState(false);
  const [tagsList, setTagsList] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
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
      console.log(response.data);
      const students = response.data.data;
      setStudents(students);
      setLoading(false);
    });
  };

  const enrollStudent = () => {
    axios
      .post(`/api/v1/course/enroll/${course._id}`, { studentEmail: email })
      .then((response) => {
        console.log(response);
        const student = response.data.student;
        console.log(students.length);
        students.push(student);
        setStudents(() => students);

        alert("Student enrolled");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  React.useEffect(() => {
    getStudentsOfCourse();
  }, []);

  const redirectToCourseCreation = () => {
    history.push("/courses/new-course");
  };

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
                    {isLoading ? "Loading Courses...." : cardTitle}
                  </Box>
                </Grid>
                <Grid item xs="auto">
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
                      <Grid item xs="auto">
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
                            <FilledInput
                              style={{
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                              }}
                              type="text"
                              required
                              label="Course Name"
                              name="name"
                              onChange={handleInputChange}
                              value={email}
                              classes={{ input: classes.searchInput }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={enrollStudent}>
                                    <CheckCircleIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {selectedTags.length === 0 ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => getAllTags()}
                            style={{ marginTop: "0.25rem" }}
                          >
                            Search by Tags
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => reset()}
                          >
                            Reset
                          </Button>
                        )}
                        {addButton ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() =>
                              (window.location.href = "/projects/add")
                            }
                            style={{
                              marginLeft: "0.25rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            Add New Project
                          </Button>
                        ) : null}
                      </Box>
                    </Grid> */}
              </Grid>
            }
          >
            {""}
          </CardHeader>
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
                count={courses.length}
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
