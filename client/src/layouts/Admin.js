import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// @material-ui/icons components
import Search from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import NavbarDropdown from "../components/Dropdowns/NavbarDropdown.js";

import routes from "routes.js";

import componentStyles from "assets/theme/layouts/admin.js";

const useStyles = makeStyles(componentStyles);

const Admin = ({ user, cookies, getUserAgain }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/" && prop.role.includes(user.role)) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={() => (
              <prop.component
                user={user}
                getUserAgain={getUserAgain}
                history={history}
                cookies={cookies}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };

  return (
    <>
      <>
        <Sidebar
          user={user}
          history={history}
          role={user.role}
          routes={routes}
          logo={{
            innerLink: "/index",
            imgSrc: require("../assets/img/brand/thrive-blue.png").default,
            imgAlt: "...",
          }}
          dropdown={<NavbarDropdown user={user} />}
          input={
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-search-responsive">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search-responsive"
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <Box
                      component={Search}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    />
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          }
        />
        <Box position="relative" className={classes.mainContent}>
          <AdminNavbar
            user={user}
            cookies={cookies}
            brandText={getBrandText(location.pathname)}
            history={history}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/index" />
          </Switch>
          <Container
            maxWidth={false}
            component={Box}
            classes={{ root: classes.containerRoot }}
          >
            <AdminFooter />
          </Container>
        </Box>
      </>
    </>
  );
};

export default Admin;
