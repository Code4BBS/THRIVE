import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.1),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  align: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  table: {
    minWidth: 100,
  },
  cellB: {
    fontWeight: 500,
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: "fit-content",
  },
  cell: {
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
  },
  chipCell: {
    border: 0,
    // fontSize: 17,
  },
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
  },
  cardRootDark: {
    backgroundColor: theme.palette.dark.main,
    "& *": {
      color: theme.palette.white.main,
    },
    "& $tableCellRoot, & $tableRoot": {
      color: theme.palette.white.main,
      borderColor: theme.palette.dark.tableBorder,
    },
    "& $tableCellRootHead": {
      color: theme.palette.dark.tableHeadColor,
      backgroundColor: theme.palette.dark.tableHeadBgColor,
    },
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  cardActionsRoot: {
    paddingBottom: "1.5rem!important",
    paddingTop: "1.5rem!important",
    borderTop: "0!important",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
  tableRoot: {
    marginBottom: "0!important",
  },
  tableCellRoot: {
    verticalAlign: "middle",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    borderTop: "0",
  },
  tableCellRootNew: {
    verticalAlign: "middle",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    borderTop: "0",
  },
  tableCellRootHead: {
    backgroundColor: theme.palette.gray[100],
    color: theme.palette.gray[600],
  },
  tableCellRootBodyHead: {
    textTransform: "unset!important",
    fontSize: ".8125rem",
  },
  linearProgressRoot: {
    height: "3px!important",
    width: "120px!important",
    margin: "0!important",
  },
  bgGradientError: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  bgGradientSuccess: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  bgGradientPrimary: {
    background:
      "linear-gradient(87deg," +
      theme.palette.primary.main +
      ",#825ee4)!important",
  },
  bgGradientInfo: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  bgGradientWarning: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
  bgPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  bgPrimaryLight: {
    backgroundColor: theme.palette.primary.light,
  },
  bgError: {
    backgroundColor: theme.palette.error.main,
  },
  bgErrorLight: {
    backgroundColor: theme.palette.error.light,
  },
  bgWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  bgWarningLight: {
    backgroundColor: theme.palette.warning.light,
  },
  bgInfo: {
    backgroundColor: theme.palette.info.main,
  },
  bgInfoLight: {
    backgroundColor: theme.palette.info.light,
  },
  bgSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  verticalAlignMiddle: {
    verticalAlign: "middle",
  },
  avatarRoot: {
    width: "36px",
    height: "36px",
    fontSize: ".875rem",
  },
  searchBox: {
    borderColor: theme.palette.adminNavbarSearch.main,
    borderRadius: "2rem",
    border: "2px solid",
    width: "300px",
    boxShadow: boxShadows.inputBoxShadow,
    transition: "box-shadow .15s ease",
  },
  searchIcon: {
    color: "red",
    marginRight: "0.5rem",
    marginLeft: "1rem",
  },
  searchInput: {
    color: "black",
    width: "270px",
    backgroundColor: "initial",
    border: 0,
    boxShadow: "none",
    padding: "0",
  },

  select: {
    backgroundColor: "transparent",
    borderRadius: "5px",
  },
});

export default componentStyles;
