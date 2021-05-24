import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  Button,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  InputBase,
} from "@material-ui/core";
import getInitials from "../customer/CustomerListView/getInitials";
import { Search as SearchIcon } from "react-feather";
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Results = ({
  className,
  customers,
  getCollaboraters,
  initialSelectedCollaborators,
  projectName,
  hide,
  currentUser,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(customers);
  const [search, setSearch] = useState("");
  const [selectedCollaborators, setSelectedCollaborators] = useState(
    initialSelectedCollaborators
  );

  // let navigate = useNavigate();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const resetSearch = () => {
    setUsers(customers);
  };

  const searchUser = (event) => {
    if (event.target.value === "") {
      resetSearch();
    } else {
      setSearch(event.target.value);
    }
  };

  const resetSelections = () => {
    setSelectedCollaborators([]);
  };

  useEffect(() => {
    filterResults();
  }, [search]);

  const filterResults = () => {
    let filterUsers = customers.filter((user) => {
      return (
        user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    setUsers(filterUsers);
  };

  const changeCollaborators = (user) => {
    if (user._id !== currentUser._id) {
      const index = selectedCollaborators.indexOf(user._id);

      if (index !== -1) {
        const newCollaborators = [...selectedCollaborators];
        newCollaborators.splice(index, 1);
        setSelectedCollaborators(newCollaborators);
      } else {
        const newCollaborators = [...selectedCollaborators];
        newCollaborators.push(user._id);
        setSelectedCollaborators(newCollaborators);
      }
    }
  };

  const sendCollaborators = () => {
    getCollaboraters(selectedCollaborators);
  };

  const headings = ["Name", "Email", "Selected"];

  return (
    <div>
      <Box mt={3}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent style={{ padding: 0 }}>
            <TableContainer
              className={classes.table}
              aria-label="simple table"
              style={{ margin: 0 }}
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cellB}
                    style={{ verticalAlign: "middle" }}
                  >
                    Add Collaborator for your project
                  </TableCell>

                  <TableCell align="right" className={classes.cell}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ alignSelf: "right" }}
                      onClick={sendCollaborators}
                    >
                      Save
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={resetSelections}
                      disabled={selectedCollaborators === []}
                      style={{ alignSelf: "right" }}
                    >
                      Reset
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow style={{ marginLeft: "5px", marginTop: "5px" }}>
                  {selectedCollaborators.length > 0
                    ? customers.map((collaborator, index) => {
                        if (selectedCollaborators.includes(collaborator._id)) {
                          return (
                            <li
                              key={index}
                              style={{ display: "inline", margin: "3px" }}
                            >
                              <Chip
                                variant="outlined"
                                label={collaborator.name}
                                avatar={<Avatar src={collaborator.image} />}
                                style={{ color: "black!important" }}
                                onDelete={() =>
                                  changeCollaborators(collaborator)
                                }
                              />
                            </li>
                          );
                        }
                        return null;
                      })
                    : null}
                </TableRow>
              </TableBody>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      <>
        <br></br>
        <Card classes={{ root: classes.cardRoot }}>
          <TableContainer>
            <PerfectScrollbar>
              <Box
                component={Table}
                alignItems="center"
                marginBottom="0!important"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Grid item md={7} xs={12}>
                          <Box
                            display="flex"
                            alignItems="center"
                            width="auto"
                            marginRight="2rem"
                            classes={{
                              root: classes.searchBox,
                            }}
                          >
                            <SearchIcon
                              style={{
                                color: "grey ",
                                marginRight: "7px",
                                marginLeft: "3px",
                              }}
                            />

                            <InputBase
                              placeholder="Search student by name or email"
                              classes={{
                                input: classes.searchInput,
                              }}
                              style={{ letterSpacing: 0 }}
                              onChange={searchUser}
                            />
                          </Box>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {headings.map((heading, index) => (
                        <TableCell
                          key={`cell-${index}`}
                          classes={{
                            root:
                              classes.tableCellRoot +
                              " " +
                              classes.tableCellRootHead,
                          }}
                        >
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(page * limit, (page + 1) * limit)
                      .map((user) => (
                        <TableRow
                          hover
                          key={user._id}
                          onClick={() => changeCollaborators(user)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            classes={{
                              root:
                                classes.tableCellRootNew +
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
                                src={user.image}
                              >
                                {getInitials(user.name)}
                              </Avatar>
                              <Typography
                                color="textPrimary"
                                variant="body1"
                                style={{ letterSpacing: 0 }}
                              >
                                {user.name.toLowerCase()}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>{user.email}</TableCell>
                          <TableCell
                            classes={{
                              root:
                                classes.tableCellRootNew +
                                " " +
                                classes.tableCellRootBodyHead,
                            }}
                          >
                            {user._id === currentUser._id ? (
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                style={{ alignSelf: "center" }}
                              >
                                Owner
                              </Button>
                            ) : selectedCollaborators.includes(user._id) ? (
                              <Button
                                size="small"
                                variant="contained"
                                color="transparent"
                                style={{ alignSelf: "center" }}
                              >
                                Selected
                              </Button>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </TableContainer>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
