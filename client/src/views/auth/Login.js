import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
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
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";

const useStyles = makeStyles(componentStyles);

const Login = ({ sucessLogin }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const successResponseGoogle = (response) => {
    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf("@");
    const domain = emailUsed.substr(index);

    if (domain !== "@iitbbs.ac.in") {
      alert("Use your IIT Bhubaneswar email id.");
      return false;
    } else {
      axios
        .post(
          "/api/v1/auth/login",
          { tokenId: response.tokenId },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          sucessLogin(response);
        })
        .catch((err) => console.log(err));
      console.log("success");
    }
  };
  const failureResponseGoogle = (response) => {
    console.log("he2");
    alert("Use your IIT BBS email for login");
  };

  const submitCredentials = (event) => {
    event.preventDefault();
    const data = { email: values.email };
    axios
      .post("/api/v1/auth/testLogin", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        sucessLogin(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize="80%"
                fontWeight="400"
                component="small"
                color={theme.palette.gray[600]}
              >
                Sign in with your college email
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
            subheader={
              <Box textAlign="center">
                <GoogleLogin
                  className="google-login"
                  clientId="814516511786-nucvcmf3osa464saoshkeg2ma2slfuqa.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      variant="contained"
                      classes={{ root: classes.buttonRoot }}
                      onClick={renderProps.onClick}
                    >
                      <Box component="span" marginRight="4px">
                        <Box
                          alt="..."
                          component="img"
                          width="20px"
                          className={classes.buttonImg}
                          src={
                            require("assets/img/icons/common/google.svg")
                              .default
                          }
                        ></Box>
                      </Box>
                      <Box component="span" marginLeft=".75rem">
                        Google
                      </Box>
                    </Button>
                  )}
                  isSignedIn={true}
                  onSuccess={successResponseGoogle}
                  onFailure={failureResponseGoogle}
                  cookiePolicy={"single_host_origin"}
                  icon={false}
                  padding={100}
                />
              </Box>
            }
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
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
                name="email"
                value={values.email}
                onChange={handleChange}
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
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label="Remeber me"
              labelPlacement="end"
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="primary"
                variant="outlined"
                onClick={(e) => submitCredentials(e)}
              >
                Sign in
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* <Grid container component={Box} marginTop="1rem">
        <p>Extra</p>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Login;
