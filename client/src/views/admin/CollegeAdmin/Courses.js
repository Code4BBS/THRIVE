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

// core components
import Header from "../../../components/Headers/Header.js";
// import TagList from "./TagsList";

import axios from "axios";
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const CourseTable = ({ user, history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [cardTitle, setCardTitle] = React.useState("Courses in college");
  const [addButton, showAddButton] = React.useState(false);
  const [anchorId, setAnchorId] = React.useState(null);
  const [currentAnchor, setCurrentAnchor] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [tagsPane, setShowTagsPane] = React.useState(false);
  const [tagsList, setTagsList] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

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

  //   const getAllProjectsByTags = () => {
  //     const data = {
  //       tagsSelected: selectedTags,
  //     };

  //     axios
  //       .post("/api/v1/search/project/tags", data, { withCredentials: true })
  //       .then((response) => {
  //         let data = response.data.data.projects;
  //         console.log(data);
  //         console.log("response");
  //         if (data) setProjects(data);
  //         setPage(0);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const headers = ["Course", "ID", "Branch", "Teacher", "Students"];

  if (user && user.role === "admin") {
    headers.push("");
  }

  const getCourses = () => {
    axios.get("/api/v1/course").then((response) => {
      console.log(response.data);
      const courses = response.data.data;
      setCourses(courses);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getCourses();
  }, []);

  const redirectToCourseCreation = () => {
    history.push("/courses/new-course");
  };

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Box
          component={Card}
          marginTop="3rem"
          classes={{ root: classes.cardRoot + " " + classes.cardRootDark }}
        >
          <Card
            classes={{ root: classes.cardRoot + " " + classes.cardRootDark }}
          >
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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => redirectToCourseCreation()}
                      style={{ marginTop: "0.25rem" }}
                    >
                      Create new Course
                    </Button>
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
                    {courses &&
                      courses
                        .slice(page * limit, (page + 1) * limit)
                        .map((course, index) => {
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
                                <Box alignItems="center" display="flex">
                                  <Box display="flex" alignItems="flex-start">
                                    <Box fontSize=".875rem" component="span">
                                      {course.name}
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
                                      {course.courseCode}
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
                                      {course.branch}
                                    </Box>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell
                                classes={{ root: classes.tableCellRoot }}
                              >
                                <Box alignItems="center" display="flex">
                                  <Avatar
                                    style={{
                                      marginRight: "1rem",
                                      height: "2rem",
                                      width: "2rem",
                                    }}
                                    alt="..."
                                    src={course.teacher.image}
                                  />

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
                                        {course.teacher.name}
                                      </a>
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
                                      {course.students.length}
                                    </Box>
                                  </Box>
                                </Box>
                              </TableCell>

                              {/* <TableCell
                                classes={{ root: classes.tableCellRoot }}
                              >
                                <Button
                                  variant="contained"
                                  size="small"
                                  style={{ marginRight: "0.5rem" }}
                                  onClick={() =>
                                    (window.location.href = `/projects/${project._id}`)
                                  }
                                >
                                  Click Here
                                </Button>
                              </TableCell> */}

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
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default CourseTable;
