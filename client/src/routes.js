// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
import CustomerListView from "views/admin/customer/CustomerListView/index.js";
// import Discover from "views/admin/Discover.js";

import Projects from "views/admin/Projects.js";
import AddProject from "views/admin/Add Project.js";
import Quora from "views/admin/Quora/index.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dns from "@material-ui/icons/Dns";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
import Palette from "@material-ui/icons/Palette";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import PeopleIcon from "@material-ui/icons/People";
import VpnKey from "@material-ui/icons/VpnKey";
import ContactSupportTwoToneIcon from "@material-ui/icons/ContactSupportTwoTone";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CreateIcon from "@material-ui/icons/Create";

var routes = [
  // {
  //   href: "#pablo",
  //   name: "Upgrade to pro",
  //   icon: FlashOn,
  //   upgradeToPro: true,
  // },
  {
    path: "/index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: EmojiObjectsIcon,
    iconColor: "PrimaryLight",
    component: Projects,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: Grain,
    iconColor: "Primary",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: FormatListBulleted,
    iconColor: "Error",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/discover",
    name: "Discover",
    icon: PeopleIcon,
    iconColor: "Primary",
    component: CustomerListView,
    layout: "/admin",
  },
  {
    path: "/quora",
    name: "Quora",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Warning",
    component: Quora,
    layout: "/admin",
  },
  {
    path: "/addProject",
    name: "Add Project",
    icon: CreateIcon,
    iconColor: "Primary",
    component: AddProject,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: VpnKey,
  //   iconColor: "Info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: AccountCircle,
  //   iconColor: "ErrorLight",
  //   component: Register,
  //   layout: "/auth",
  // },
  {
    divider: true,
  },
  {
    title: "Documentation",
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
    name: "Getting started",
    icon: FlashOn,
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
    name: "Foundation",
    icon: Palette,
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
    name: "Components",
    icon: Dns,
  },
];
export default routes;
