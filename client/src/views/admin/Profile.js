import React, { useEffect } from "react";
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
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";

// core components
import UserHeader from "../../components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);

function Profile({ user }) {
  const classes = useStyles();
  const theme = useTheme();

  let tagMap = {};
  let tagMapArray = [];
  if (user.tags) {
    for (let tag of user.tags) {
      tagMap[tag.group] = [];
    }
    for (let tag of user.tags) {
      tagMap[tag.group].push(tag);
    }
    for (let group in tagMap) {
      tagMapArray.push({ name: group, tags: tagMap[group] });
    }
  }
  return (
    <>
      <UserHeader user={user} />
      {/* Page content */}
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
              <CardHeader
                subheader={
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
                        Your Account
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Edit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
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
                            defaultValue={user.name}
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
                            defaultValue={user.email}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  {/* <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>First name</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="Lucky"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue="Jesse"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid> */}
                </div>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            disabled
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue={user.rollNumber}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Branch</FormLabel>
                        <FormControl
                          disabled
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue={user.branch}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Program</FormLabel>
                        <FormControl
                          disabled
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            defaultValue={user.program}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="0px!important"
                />
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
                  About you
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel>Bio</FormLabel>
                        {user.bio ? (
                          <FormControl
                            disabled
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              multiline
                              defaultValue={user.bio}
                              rows="3"
                            />
                          </FormControl>
                        ) : (
                          <Chip
                            size="small"
                            style={{
                              width: "250px",
                              margin: "auto",
                            }}
                            label="You haven't added any bio yet"
                          />
                        )}
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel>Skills & Interests</FormLabel>
                        <Box>
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
                      src={user.image}
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
              {/* <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
                subheader={
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootInfo }}
                    >
                      Connect
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootDark }}
                    >
                      Message
                    </Button>
                  </Box>
                }
              ></Box> */}
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="1rem 0"
                      justifyContent="center"
                      display="flex"
                      className={classes.mtMd5}
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          22
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Friends
                        </Box>
                      </Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          10
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Photos
                        </Box>
                      </Box>
                      <Box textAlign="center" padding=".875rem">
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          89
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Comments
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">{user.name}</Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {user.branch + " " + user.program}
                  </Box>
                  {/* <Box
                    component={Typography}
                    variant="h5"
                    marginTop="3rem!important"
                  >
                    Solution Manager - Creative Tim Officer
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  >
                    <Box
                      component={School}
                      width="1.25rem!important"
                      height="1.25rem!important"
                      marginRight=".5rem"
                    ></Box>
                    University of Computer Science
                  </Box> */}
                  {user.description
                    ? [
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
                          {user.description}
                        </Box>,
                      ]
                    : null}
                  {/* <a
                    href="#mui"
                    className={classes.cardProfileLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    Show More
                  </a> */}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
