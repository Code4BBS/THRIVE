import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Wrapper from "./Wrapper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { CookiesProvider, withCookies } from "react-cookie";
import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withCookies(App);
