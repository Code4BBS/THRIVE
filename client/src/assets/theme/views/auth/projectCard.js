import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {},
  cardHeader: {
    backgroundColor: "initial",
  },
  cardContent: {
    [theme.breakpoints.up("md")]: {
      padding: "1rem",
    },
    padding: "0.3rem",
  },
  buttonImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  buttonRoot: {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.primary.main,
    boxShadow: boxShadows.buttonBoxShadowNeutral,
    borderColor: theme.palette.white.main + "!important",
    "&:hover": {
      color: theme.palette.gray[900],
      borderColor: theme.palette.white.main + "!important",
      backgroundColor: theme.palette.white.main,
    },
  },

  footerLinks: {
    color: theme.palette.black.main,
    textDecoration: "none",
  },
});

export default componentStyles;
