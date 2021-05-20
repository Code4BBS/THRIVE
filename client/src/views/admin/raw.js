//For Dark Tables
{
  /* <Box
          component={Card}
          marginTop="3rem"
          classes={{ root: classes.cardRoot + " " + classes.cardRootDark }}
        >
          <CardHeader
            className={classes.cardHeader}
            title="Card Tables"
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
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Project
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Budget
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Users
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Completion
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
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
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={require("assets/img/theme/bootstrap.jpg").default}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          Argon Design System
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    $2,500 USD
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgWarning
                        }
                      ></Box>
                      pending
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroup>
                      <Tooltip title="Ryan Tompson" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Romina Hadid" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-2-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Alexander Smith" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-3-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Jessica Doe" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        60%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientError,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-6"
                      aria-haspopup="true"
                      onClick={handleClick}
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
                      id="simple-menu-6"
                      anchorEl={anchorEl6}
                      keepMounted
                      open={Boolean(anchorEl6)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={require("assets/img/theme/angular.jpg").default}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          Angular Now UI Kit PRO
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    $1,800 USD
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgSuccess
                        }
                      ></Box>
                      completed
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroup>
                      <Tooltip title="Ryan Tompson" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Romina Hadid" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-2-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Alexander Smith" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-3-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Jessica Doe" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        100%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={100}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientSuccess,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-7"
                      aria-haspopup="true"
                      onClick={handleClick}
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
                      id="simple-menu-7"
                      anchorEl={anchorEl7}
                      keepMounted
                      open={Boolean(anchorEl7)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={require("assets/img/theme/sketch.jpg").default}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          Black Dashboard
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    $3,150 USD
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgError
                        }
                      ></Box>
                      delayed
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroup>
                      <Tooltip title="Ryan Tompson" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Romina Hadid" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-2-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Alexander Smith" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-3-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Jessica Doe" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        72%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={72}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientError,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-8"
                      aria-haspopup="true"
                      onClick={handleClick}
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
                      id="simple-menu-8"
                      anchorEl={anchorEl8}
                      keepMounted
                      open={Boolean(anchorEl8)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={require("assets/img/theme/react.jpg").default}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          React Material Dashboard
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    $4,400 USD
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgInfo
                        }
                      ></Box>
                      on schedule
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroup>
                      <Tooltip title="Ryan Tompson" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Romina Hadid" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-2-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Alexander Smith" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-3-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Jessica Doe" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        90%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={90}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientInfo,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-9"
                      aria-haspopup="true"
                      onClick={handleClick}
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
                      id="simple-menu-9"
                      anchorEl={anchorEl9}
                      keepMounted
                      open={Boolean(anchorEl9)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={require("assets/img/theme/vue.jpg").default}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          Vue Paper UI Kit PRO
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellRoot,
                    }}
                  >
                    $2,200 USD
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle + " " + classes.bgSuccess
                        }
                      ></Box>
                      completed
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroup>
                      <Tooltip title="Ryan Tompson" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Romina Hadid" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-2-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Alexander Smith" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-3-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Jessica Doe" placement="top">
                        <Avatar
                          classes={{ root: classes.avatarRoot }}
                          alt="..."
                          src={
                            require("assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </Tooltip>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellRoot,
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box component="span" marginRight=".5rem">
                        100%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={100}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes.bgGradientSuccess,
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <Box
                      aria-controls="simple-menu-10"
                      aria-haspopup="true"
                      onClick={handleClick}
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
                      id="simple-menu-10"
                      anchorEl={anchorEl10}
                      keepMounted
                      open={Boolean(anchorEl10)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Action</MenuItem>
                      <MenuItem onClick={handleClose}>Another action</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Something else here
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Box>
          </TableContainer>
        </Box> */
}
