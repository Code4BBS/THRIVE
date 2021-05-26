import React, { useEffect } from "react";
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
import TagList from "./TagsList";

import axios from "axios";
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const ProjectTable = ({ user }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [projects, setProjects] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [cardTitle, setCardTitle] = React.useState("Projects");
  const [addButton, showAddButton] = React.useState(false);
  const [anchorId, setAnchorId] = React.useState(null);
  const [currentAnchor, setCurrentAnchor] = React.useState(null);
  const [limit, setLimit] = React.useState(5);
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

  const hideTagsPane = () => {
    setShowTagsPane(false);
  };

  const getSelectedTags = (tagsSelected) => {
    console.log(tagsSelected);
    setSelectedTags(tagsSelected);
    setShowTagsPane(false);
  };

  const getAllTags = () => {
    axios
      .get("/api/v1/user/tag", { withCredentials: true })
      .then((response) => {
        let data = response.data.data.docs;
        console.log("response");
        setTagsList(data);
        setShowTagsPane(true);
      })
      .catch((err) => console.log(err));
  };

  const getAllProjectsByTags = () => {
    const data = {
      tagsSelected: selectedTags,
    };

    axios
      .post("/api/v1/search/project/tags", data, { withCredentials: true })
      .then((response) => {
        let data = response.data.data.projects;
        console.log(data);
        console.log("response");
        if (data) setProjects(data);
        setPage(0);
      })
      .catch((err) => console.log(err));
  };

  const headers = ["Project", "Owner", "Tags", "Collaborators", "More Details"];

  if (user && user.role === "admin") {
    headers.push("");
  }

  const getProjects = () => {
    let url = window.location.pathname.split("/");
    let route = url[2];
    let axiosRoute = "/api/v1/project";
    let noProjectsMessage = "Currently no projects available !";
    if (route === "myProjects") {
      axiosRoute = `${axiosRoute}/myProjects`;
      setCardTitle("My Projects");
      showAddButton(true);
      noProjectsMessage = "Currently you are not associated with any project.";
    }

    axios.get(axiosRoute).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        setLoading(false);
        if (response.data.data.res > 0) {
          setProjects(response.data.data.projects);
        } else {
          window.alert(noProjectsMessage);
          window.location.href = "/projects";
        }
      }
    });
  };

  React.useEffect(() => {
    if (selectedTags.length !== 0) {
      getAllProjectsByTags();
    } else {
      getProjects();
    }
  }, [selectedTags]);

  const blacklistProject = (project, index) => {
    axios.patch(`/api/v1/project/blacklist/${project._id}`).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        window.alert("Project blacklisted successfully");
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
      }
    });
  };

  const reset = () => {
    setSelectedTags([]);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      {!tagsPane ? (
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
                        {isLoading ? "Loading Projects...." : cardTitle}
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
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
                    </Grid>
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
                      {projects &&
                        projects
                          .slice(page * limit, (page + 1) * limit)
                          .map((project, index) => {
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
                                        {project.title}
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
                                      src={project.owner.image}
                                    />
                                    <Box display="flex" alignItems="flex-start">
                                      <Box fontSize=".875rem" component="span">
                                        <a
                                          href={
                                            project.owner._id === user._id
                                              ? `/user-profile`
                                              : `/${project.owner._id}`
                                          }
                                          style={{ textDecoration: "none" }}
                                        >
                                          {project.owner._id === user._id
                                            ? "You"
                                            : project.owner.name}
                                        </a>
                                      </Box>
                                    </Box>
                                  </Box>
                                </TableCell>

                                <TableCell
                                  classes={{ root: classes.tableCellRoot }}
                                >
                                  {project.tags.map((tag) => {
                                    return (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{ marginRight: "0.5rem" }}
                                        key={tag._id}
                                      >
                                        {tag.name}
                                      </Button>
                                    );
                                  })}
                                </TableCell>

                                <TableCell
                                  classes={{ root: classes.tableCellRoot }}
                                >
                                  {project.collaborators.length > 0 ? (
                                    <AvatarGroup>
                                      {project.collaborators.map(
                                        (collaborator, id) => {
                                          return (
                                            <Tooltip
                                              title={collaborator.name}
                                              placement="top"
                                              key={id}
                                            >
                                              <Avatar
                                                classes={{
                                                  root: classes.avatarRoot,
                                                }}
                                                alt="..."
                                                src={collaborator.image}
                                              />
                                            </Tooltip>
                                          );
                                        }
                                      )}
                                    </AvatarGroup>
                                  ) : null}
                                </TableCell>
                                <TableCell
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
                                      <MenuItem
                                        onClick={() => {
                                          blacklistProject(project, index);
                                          handleMenuClose();
                                        }}
                                      >
                                        Blacklist Project
                                      </MenuItem>
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
                count={projects.length}
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
};

export default ProjectTable;
