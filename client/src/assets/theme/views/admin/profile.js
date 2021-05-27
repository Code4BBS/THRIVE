import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  cardRootSecondary: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.white.main + "!important",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  gridItemRoot: {
    [theme.breakpoints.up("xl")]: {
      marginBottom: "0!important",
    },
  },
  typographyRootH6: {
    textTransform: "uppercase",
  },
  plLg4: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "1.5rem",
    },
  },
  ptMd4: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "1.5rem!important",
    },
  },
  mtMd5: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "3rem!important",
    },
  },
  cardHeaderRootProfile: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "1.5rem!important",
      paddingTop: "1.5rem!important",
    },
  },
  buttonRootInfo: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },
  buttonRootDark: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.dark.main,
    "&:hover": {
      backgroundColor: theme.palette.dark.dark,
    },
    "&:disabled": {
      border: "0",
    },
  },
  profileImage: {
    verticalAlign: "middle",
    borderStyle: "none",
    transform: "translate(-50%,-30%)",
    transition: "all .15s ease",
  },
  cardProfileLink: {
    color: theme.palette.primary.main,
    backgroundColor: "initial",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  order1: {
    [theme.breakpoints.down("lg")]: {
      order: "1!important",
    },
  },
  order2: {
    [theme.breakpoints.down("lg")]: {
      order: "2!important",
    },
  },
  marginBottomXl0: {
    [theme.breakpoints.up("lg")]: {
      marginBottom: "0!important",
    },
  },

  checkBoxLabel: {
    fontSize: "0.8rem",
  },

  searchInput: {
    color: "black",
    width: "270px",
    backgroundColor: "initial",
    border: 0,
    boxShadow: "none",
    padding: "0",
    "&::placeholder": {
      color: theme.palette.dark[200],
      fontSize: "1rem",
    },
  },
  paperRoot: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    width: "100%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
});

export default componentStyles;
