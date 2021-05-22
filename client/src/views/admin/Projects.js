import React from "react";

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
// import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/lab components
// import AvatarGroup from "@material-ui/lab/AvatarGroup";
// import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons components
import MoreVert from "@material-ui/icons/MoreVert";

import Modal from "components/Custom/Modals/Modal.js";

// core components
import Header from "components/Headers/Header.js";

import axios from "axios";
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Tables = ({ user }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [modalDetails, setModalDetails] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [anchorId, setAnchorId] = React.useState(null);
  const [currentAnchor, setCurrentAnchor] = React.useState(null);

  const handleModalOpen = (project) => {
    setModalDetails({
      title: project.title,
      description: project.description,
      communication: project.communication,
      preRequisite: project.preRequisite,
    });
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event, index) => {
    setCurrentAnchor(event.currentTarget);
    setAnchorId(index);
  };

  const handleMenuClose = () => {
    setAnchorId(null);
  };

  const headers = ["Project", "Owner", "Tags", "Duration", "More Details"];

  if (user && user.role === "admin") {
    headers.push("");
  }

  const getProjects = () => {
    axios.get("/api/v1/project").then((response) => {
      console.log(response);
      if (response.status === 200) {
        if (response.data.data.res > 0) {
          setProjects(response.data.data.projects);
        }
      }
    });
  };

  React.useEffect(() => {
    getProjects();
  }, []);

  let modal = null;
  if (modalDetails !== null && modalDetails !== undefined) {
    modal = (
      <Modal
        open={open}
        handleClose={handleModalClose}
        title={modalDetails.title}
        description={modalDetails.description}
        communication={modalDetails.communication}
        preRequisite={modalDetails.preRequisite}
      />
    );
  }

  const blacklistProject = (project, index) => {
    axios.put(`/api/v1/project/blacklist/${project._id}`).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        const updatedProjects = [...projects];
        updatedProjects.slice(index, 1);
        setProjects(updatedProjects);

        let con = window.confirm("Project blacklisted successfully");
        if (con) window.location.reload();
      }
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
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
          <CardHeader
            className={classes.cardHeader}
            title="Projects"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          ></CardHeader>
          <TableContainer>
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
                {projects.map((project, index) => {
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
                      <TableCell classes={{ root: classes.tableCellRoot }}>
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
                                href={`/admin/${project.owner._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                {project.owner.name}
                              </a>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {project.tags.map((tag) => {
                          return (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{ marginRight: "0.5rem" }}
                              // key={tag._id}
                            >
                              {tag.name}
                            </Button>
                          );
                        })}
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {project.duration ? project.duration : "Not Specified"}
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ marginRight: "0.5rem" }}
                          onClick={() => handleModalOpen(project)}
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
          </TableContainer>
        </Box>
        {modal}
      </Container>
    </>
  );
};

export default Tables;
