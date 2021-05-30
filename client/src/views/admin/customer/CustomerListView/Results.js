import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { clone } from "ramda";
import PerfectScrollbar from "react-perfect-scrollbar";
import TagGroup from "./TagGroup";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Table,
  Button,
  Input,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  InputAdornment,
  SvgIcon,
  Container,
  InputBase,
} from "@material-ui/core";
import getInitials from "./getInitials";
import { Search as SearchIcon } from "react-feather";
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Results = ({ className, customers, tags, ...rest }) => {
  const history = useHistory();

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(customers);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [sortedTags, setSortedTags] = useState([]);
  const [processedTags, setProcessTags] = useState(false);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const resetSearch = () => {
    setSelectedTags([]);
    setUsers(customers);
  };

  const searchUserByTag = () => {
    const data = {
      tagsSelected: selectedTags,
    };
    axios
      .post("/api/v1/search/tags", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data.users);
        if (response.data.data.users.length) setUsers(response.data.data.users);
        else setUsers([]);
        setFilterVisibility(false);
      })
      .catch((err) => console.log(err));
  };

  const searchUser = (event) => {
    if (event.target.value === "") {
      resetSearch();
    } else {
      setSearch(event.target.value);
    }
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

  const displayFilterPane = () => {
    setUsers(customers);
    setSelectedTags([]);
    if (!processedTags) {
      let tagMap = {};
      for (let tag of tags) {
        tagMap[tag.group] = [];
      }
      for (let tag of tags) {
        tagMap[tag.group].push(tag);
      }
      let tagMapArray = [];
      for (let group in tagMap) {
        tagMapArray.push({ name: group, tags: tagMap[group] });
      }
      setSortedTags(tagMapArray);
      setProcessTags(true);
    }
    setFilterVisibility(true);
  };

  const hideFilterPane = () => {
    setSelectedTags([]);
    setFilterVisibility(false);
  };

  const addToSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    newSelection.push(tagID);
    setSelectedTags(newSelection);
  };

  const removeFromSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    let index = newSelection.indexOf(tagID);
    if (index > -1) {
      newSelection.splice(index, 1);
      setSelectedTags(newSelection);
    }
  };

  const getOtherProfile = (id) => {
    history.push(`/user/${id}`);
    // navigate(url);
  };

  const headings = ["Name", "Email", "Roll Number"];

  return (
    <div>
      {!filterVisibility ? (
        <Box mt={3}>
          <Card classes={{ root: classes.cardRoot }}>
            <CardContent style={{ padding: 0 }}>
              <TableContainer>
                <Table
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
                        Filter students by skills, activities and participation
                      </TableCell>

                      <TableCell align="right" className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={displayFilterPane}
                          style={{ alignSelf: "right" }}
                        >
                          Filter
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={resetSearch}
                          disabled={selectedTags === []}
                          style={{ alignSelf: "right" }}
                        >
                          Reset
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      ) : null}
      {filterVisibility ? (
        <Box mt={3}>
          <Card>
            <CardContent style={{ padding: 20 }}>
              <Grid container spacing={3}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {sortedTags.map((group, index) => {
                        return (
                          <TagGroup
                            key={index}
                            classes={classes}
                            tagGroup={group.name}
                            tags={group.tags}
                            addToSelected={addToSelected}
                            removeFromSelected={removeFromSelected}
                          />
                        );
                      })}
                      <TableRow>
                        <TableCell align="left" className={classes.cell}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={searchUserByTag}
                            style={{ alignSelf: "left" }}
                          >
                            Search
                          </Button>
                          &nbsp; &nbsp;
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={hideFilterPane}
                            style={{ alignSelf: "left" }}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : null}
      {!filterVisibility ? (
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
                            align={
                              index === 0
                                ? "left"
                                : index === 1
                                ? "left"
                                : "center"
                            }
                          >
                            {heading}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users
                        .slice(page * limit, (page + 1) * limit)
                        .map((customer) => (
                          <TableRow
                            hover
                            key={customer._id}
                            selected={
                              selectedCustomerIds.indexOf(customer.id) !== -1
                            }
                            onClick={() => getOtherProfile(customer._id)}
                            style={{ cursor: "pointer" }}
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
                              <Box
                                alignItems="center"
                                display="flex"
                                style={{ textTransform: "capitalize" }}
                              >
                                <Avatar
                                  className={classes.avatar}
                                  src={customer.image}
                                >
                                  {getInitials(customer.name)}
                                </Avatar>
                                <Typography
                                  color="textPrimary"
                                  variant="body1"
                                  style={{ letterSpacing: 0 }}
                                >
                                  {customer.name.toLowerCase()}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell align="center">
                              {customer.rollNumber || "-"}
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
              SelectProps={{
                variant: "outlined",
                classes: {
                  select: classes.select,
                },
              }}
            />
          </Card>
        </>
      ) : null}
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
