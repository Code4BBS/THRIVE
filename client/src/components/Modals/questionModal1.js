import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// core components
import componentStyles from "assets/theme/views/auth/login.js";

const useStyles = makeStyles(componentStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Example() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cardClasses = { root: classes.cardRoot };
  const buttonClasses = { root: classes.buttonRoot };
  const cardContentClasses = { root: classes.cardContent };
  const checkboxClasses = {
    root: classes.formControlLabelRoot,
    label: classes.formControlLabelLabel,
  };
  const titleTypographyProps = {
    component: Box,
    textAlign: "center",
    marginBottom: "1rem!important",
    marginTop: ".5rem!important",
    fontSize: "1rem!important",
  }
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Card classes={cardClasses}>
            {/* <CardHeader
              className={classes.cardHeader}
              title={
                <Box
                  fontSize="80%"
                  fontWeight="400"
                  component="small"
                  color={theme.palette.gray[600]}
                >
                  Sign in with
                </Box>
              }
              titleTypographyProps={titleTypographyProps}
              subheader={
                <Box textAlign="center">
                  <Box
                    component={Button}
                    variant="contained"
                    marginRight=".5rem!important"
                    classes={buttonClasses}
                  >
                    <Box component="span" marginRight="4px">
                      <Box
                        alt="..."
                        component="img"
                        width="20px"
                        className={classes.buttonImg}
                        src={
                          require("assets/img/icons/common/github.svg").default
                        }
                      ></Box>
                    </Box>
                    <Box component="span" marginLeft=".75rem">
                      Github
                    </Box>
                  </Box>
                  <Button variant="contained" classes={buttonClasses}>
                    <Box component="span" marginRight="4px">
                      <Box
                        alt="..."
                        component="img"
                        width="20px"
                        className={classes.buttonImg}
                        src={
                          require("assets/img/icons/common/google.svg").default
                        }
                      ></Box>
                    </Box>
                    <Box component="span" marginLeft=".75rem">
                      Google
                    </Box>
                  </Button>
                </Box>
              }
            ></CardHeader> */}
            <CardContent classes={cardContentClasses}>
              <Box
                color={theme.palette.gray[600]}
                textAlign="center"
                marginBottom="1rem"
                marginTop=".5rem"
                fontSize="1rem"
              >
                <Box fontSize="80%" fontWeight="400" component="small">
                  Or sign in with credentials
                </Box>
              </Box>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  startAdornment={
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
              >
                <FilledInput
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label="Remeber me"
                labelPlacement="end"
                classes={checkboxClasses}
              />
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Button color="primary" variant="contained">
                  Sign in
                </Button>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}