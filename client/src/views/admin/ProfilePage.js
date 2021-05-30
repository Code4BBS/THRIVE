import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@material-ui/core";

import TagGroup from "./TagGroup";
import Header from "../../components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

import axios from "axios";

import { clone } from "ramda";

const useStyles = makeStyles(componentStyles);

const singleTags = ["Program", "Admission Year", "Branch"];

function Profile({ user, getUserAgain }) {
  const classes = useStyles();
  const theme = useTheme();

  const [otherUser, setOtherUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  let tagMap = {};
  let tagMapArray = [];
  if (otherUser && otherUser.tags) {
    for (let tag of otherUser.tags) {
      tagMap[tag.group] = [];
    }
    for (let tag of otherUser.tags) {
      tagMap[tag.group].push(tag);
    }
    for (let group in tagMap) {
      tagMapArray.push({ name: group, tags: tagMap[group] });
    }
  }

  const getUser = () => {
    let url = window.location.pathname.split("/");
    let userId = url[2];
    axios
      .get(`/api/v1/user/other?id=${userId}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // console.log(response.data.data.project);
          setLoading(false);
          setOtherUser(response.data.data.user);
          // setProject(response.data.data.project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      {!isLoading && otherUser ? (
        <Container
          maxWidth={false}
          component={Box}
          marginTop="-6rem"
          classes={{ root: classes.containerRoot }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              xl={8}
              component={Box}
              marginBottom="3rem"
              classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
            >
              <Card
                classes={{
                  root: classes.cardRoot + " " + classes.cardRootSecondary,
                }}
              >
                <CardContent>
                  <Box
                    component={Typography}
                    variant="h6"
                    color={theme.palette.gray[600] + "!important"}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    User Information
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>Username</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                            disabled
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              type="text"
                              defaultValue={otherUser.name}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                            disabled
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              type="email"
                              defaultValue={otherUser.email}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </div>

                  <Box
                    component={Typography}
                    variant="h5"
                    color={theme.palette.gray[600] + "!important"}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    About {otherUser.name}
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormLabel>Skills & Interests</FormLabel>

                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TableContainer
                              style={{
                                backgroundColor: "white",
                                borderRadius: ".375rem",
                                boxShadow:
                                  "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                              }}
                            >
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                                style={{ margin: "10px 0px 0px 0px" }}
                              >
                                <TableBody>
                                  {user.tags !== undefined &&
                                  user.tags.length !== 0 ? (
                                    tagMapArray
                                      .sort((a, b) => {
                                        if (a.name < b.name) return -1;
                                        return 1;
                                      })
                                      .map((group, index) => {
                                        return [
                                          <TableRow
                                            key={`type${index}`}
                                            className={classes.cellBA}
                                          >
                                            &nbsp;&nbsp;&nbsp;&nbsp;{group.name}
                                          </TableRow>,
                                          <TableRow key={`tags${index}`}>
                                            <TableCell style={{ border: 0 }}>
                                              {group.tags.map((tag, index) => {
                                                return (
                                                  <Chip
                                                    size="small"
                                                    key={
                                                      tag.group + " " + tag.name
                                                    }
                                                    className={classes.chip}
                                                    variant="outlined"
                                                    color="primary"
                                                    style={{
                                                      marginRight: "3px",
                                                    }}
                                                    label={tag.name}
                                                  />
                                                );
                                              })}
                                            </TableCell>
                                          </TableRow>,
                                        ];
                                      })
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ border: 0 }}
                                      >
                                        <Chip label="No tags available, update profile to see" />
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              xl={4}
              component={Box}
              marginBottom="3rem!important"
              classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
            >
              <Card classes={{ root: classes.cardRoot }}>
                <Box component={Grid} container justifyContent="center">
                  <Grid item xs={12} lg={3}>
                    <Box position="relative">
                      <Box
                        component="img"
                        src={otherUser.image}
                        alt="..."
                        maxWidth="180px"
                        borderRadius="50%"
                        position="absolute"
                        left="50%"
                        boxShadow={boxShadows.boxShadow + "!important"}
                        className={classes.profileImage}
                      />
                    </Box>
                  </Grid>
                </Box>

                <Box
                  component={CardContent}
                  classes={{ root: classes.ptMd4 }}
                  paddingTop="0!important"
                >
                  <Box textAlign="center" style={{ marginTop: "75px" }}>
                    <Typography variant="h3">{otherUser.name}</Typography>
                    <Box
                      component={Typography}
                      variant="h5"
                      fontWeight="300!important"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {otherUser.branch + " " + otherUser.program}
                    </Box>
                    <Box
                      component={Typography}
                      variant="h4"
                      fontWeight="300!important"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {otherUser.rollNumber}
                    </Box>

                    {otherUser.bio ? (
                      [
                        <Box
                          component={Divider}
                          marginTop="1.5rem!important"
                          marginBottom="1.5rem!important"
                        ></Box>,
                        <Box
                          component="p"
                          fontWeight="300"
                          lineHeight="1.7"
                          marginBottom="1rem"
                          fontSize="1rem"
                        >
                          {otherUser.bio}
                        </Box>,
                      ]
                    ) : (
                      <Chip
                        size="small"
                        style={{
                          width: "250px",
                          margin: "auto",
                        }}
                        label="No bio added yet"
                      />
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <h3 style={{ alignItems: "center" }}>Loading User Data...</h3>
        </Container>
      )}
    </>
  );
}

export default Profile;
