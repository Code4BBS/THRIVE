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
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
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
// import MoreVert from "@material-ui/icons/MoreVert";

import Modal from "components/Custom/Modals/Modal.js";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const projects = [
  {
    title: "College Management Portal",
    description:
      "oing this project and I want help! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem",
    tags: ["Node.js", "React.js", "Socket.io"],
    owner: {
      name: "Shrirang Deshmukh",
      _id: "122455",
      img: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    timeDuration: "3 Months from June 2021",
    communication: {
      email: "dsp13@iitbbs.ac.in",
      linkedIn: "https://linkedin.com/in/shrirang-deshmukh",
      // whatsapp: "9511725963",
      // other: "go to this site. Contact some one else",
    },
  },
  {
    title: "ARP",
    description:
      "oing this project and I want help! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem",
    tags: ["Node.js", "Firebase"],
    owner: {
      name: "Kartikeya",
      _id: "122455",
      img: "https://lh3.googleusercontent.com/a/AATXAJze2-u0hJtkXOq5HURzbwPLhNzUcpuaRG8cocpC=s96-c",
    },
    timeDuration: "1 Month from May 2021",
    communication: {
      email: "dsp13@iitbbs.ac.in",
      linkedIn: "https://linkedin.com/in/shrirang-deshmukh",
      whatsapp: "9511725963",
      other: "Go to this site. Contact some one else",
    },
  },
  {
    title: "Equipment Portal",
    description:
      "oing this project and I want help! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem",
    tags: ["Flutter"],
    owner: {
      name: "Sai Krishna",
      _id: "122455",
      img: "https://lh3.googleusercontent.com/a/AATXAJxI8REMO2iCBEnNf9oeNmZvQjz0_ULKyRiFn6qB=s96-c",
    },
    timeDuration: "3 Months from Apr 2021",
    communication: {
      email: "dsp13@iitbbs.ac.in",
      linkedIn: "https://linkedin.com/in/shrirang-deshmukh",
      whatsapp: "9511725963",
      other: "go to this site. Contact some one else",
    },
  },
  {
    title: "Electronics Research",
    description:
      "oing this project and I want help! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem",
    tags: ["Digital Electronics", "VLSI"],
    owner: {
      name: "Some Proffessor",
      _id: "122455",
      img: "https://avatars.githubusercontent.com/u/64681029?v=4",
    },
    timeDuration: "Not Specific",
    communication: {
      email: "dsp13@iitbbs.ac.in",
      linkedIn: "https://linkedin.com/in/shrirang-deshmukh",
      whatsapp: "9511725963",
      other: "go to this site. Contact some one else",
    },
  },
  {
    title: "Machine Learning Project",
    description:
      "oing this project and I want help! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem",
    tags: ["Python", "MATLAB"],
    owner: {
      name: "Navaneeth",
      _id: "122455",
      img: "https://lh3.googleusercontent.com/a/AATXAJylBIZ_y8oCMOWoIIkNVLEdXQlnXozWPM2NOrHw=s96-c",
    },
    timeDuration: "2 months from May 2021",
    communication: {
      email: "dsp13@iitbbs.ac.in",
      linkedIn: "https://linkedin.com/in/shrirang-deshmukh",
      whatsapp: "9511725963",
      other: "go to this site. Contact some one else",
    },
  },
];

const headers = ["Project", "Owner", "Tags", "Time Duration"];

const Tables = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [modalDetails, setModalDetails] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  let modal = null;
  if (modalDetails !== null && modalDetails !== undefined) {
    modal = (
      <Modal
        open={open}
        handleClose={handleClose}
        title={modalDetails.title}
        description={modalDetails.description}
        communication={modalDetails.communication}
      />
    );
  }

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
                    <TableRow
                      key={index}
                      onClick={() => {
                        console.log("Triggered project: " + project.title);
                        setModalDetails({
                          title: project.title,
                          description: project.description,
                          communication: project.communication,
                        });

                        setOpen(true);
                      }}
                    >
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
                            src={project.owner.img}
                          />
                          <Box display="flex" alignItems="flex-start">
                            <Box fontSize=".875rem" component="span">
                              <a
                                href={`/admin/${project.owner._id}`}
                                styles={{ textDecoration: "none" }}
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
                            >
                              {tag}
                            </Button>
                          );
                        })}
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {project.timeDuration}
                      </TableCell>
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
