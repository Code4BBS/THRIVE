// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
// import CollegeAdmin from "views/admin/CollegeAdmin/collegeAdmin";
import CollegeMain from "views/admin/CollegeAdmin/collegeMain";
import CourseTable from "views/admin/CollegeAdmin/Courses.js";
import CustomerListView from "views/admin/customer/CustomerListView/index.js";
// import Discover from "views/admin/Discover.js";
import ProjectBoard from "views/admin/Project/ProjectBoard.js";
import AddProject from "views/admin/Project/AddProject.js";
import Project from "views/admin/Project/Project.js";
import EditProject from "views/admin/Project/EditProject.js";
import ProjectTable from "views/admin/Project/ProjectTable.js";
import Quora from "views/admin/Quora/index.js";
import Question from "views/admin/Quora/Question.js";
import File from "views/admin/fileUpload";
import Classroom from "./views/admin/Classroom/Classroom";
import CreateAssignment from "./views/admin/CollegeAdmin/AddAssignment";
import Course from "./views/admin/Classroom/Course";
import AssignmentView from "./views/admin/Classroom/AssignmentView";
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

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

var routes = [
  // {
  //   href: "#pablo",
  //   name: "Upgrade to pro",
  //   icon: FlashOn,
  //   upgradeToPro: true,
  // },
  {
    path: "index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/",
    show: true,
  },

  {
    path: "user-profile",
    name: "User Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/",
    show: true,
  },
  {
    path: "discover",
    name: "Discover",
    icon: PeopleIcon,
    iconColor: "Primary",
    component: CustomerListView,
    layout: "/",
    show: true,
  },

  //All Project Routes
  {
    path: "projects/all",
    name: "All Projects",
    icon: CreateIcon,
    iconColor: "Primary",
    component: ProjectTable,
    layout: "/",
    show: false,
  },
  {
    path: "projects/myProjects",
    name: "My Projects",
    icon: CreateIcon,
    iconColor: "Primary",
    component: ProjectTable,
    layout: "/",
    show: false,
  },

  {
    path: "projects/add",
    name: "Add Project",
    icon: CreateIcon,
    iconColor: "Primary",
    component: AddProject,
    layout: "/",
    show: false,
  },

  {
    path: "projects/edit/:id",
    name: "Edit Project",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Primary",
    component: EditProject,
    layout: "/",
    show: false,
  },
  {
    path: "projects/:id",
    name: "Demo Project",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Primary",
    component: Project,
    layout: "/",
    show: false,
  },
  {
    path: "projects",
    name: "Projects",
    icon: EmojiObjectsIcon,
    iconColor: "PrimaryLight",
    component: ProjectBoard,
    layout: "/",
    show: true,
  },

  // Quora Routes
  {
    path: "quora/:qId",
    name: "View Question",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Primary",
    component: Question,
    layout: "/",
    show: false,
  },
  {
    path: "quora",
    name: "Quora",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Warning",
    component: Quora,
    layout: "/",
    show: true,
  },
  {
    path: "maps",
    name: "Maps",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/",
    show: true,
  },
  {
    path: "icons",
    name: "Icons",
    icon: Grain,
    iconColor: "Primary",
    component: Icons,
    layout: "/",
    show: false,
  },
  {
    path: "tables",
    name: "Tables",
    icon: FormatListBulleted,
    iconColor: "Error",
    component: Tables,
    layout: "/",
    show: false,
  },
  //College Admin routes
  {
    path: "collegeAdmin",
    name: "College Admin",
    icon: AccountCircle,
    iconColor: "Error",
    component: CollegeMain,
    layout: "/",
    show: true,
  },
  {
    path: "courses/all",
    name: "All Courses",
    icon: CreateIcon,
    iconColor: "Primary",
    component: CourseTable,
    layout: "/",
    show: false,
  },
  {
    path: "file/upload",
    name: "Upload",
    icon: CreateIcon,
    iconColor: "Primary",
    component: File,
    layout: "/",
    show: true,
  },
  {
    divider: true,
    show: true,
  },
  {
    title: "Classroom",
    show: true,
  },
  {
    path: "classroom",
    name: "Your Courses",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: Classroom,
    layout: "/",
    show: true,
  },
  {
    path: "addAssignment",
    name: "Add Assignment",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: CreateAssignment,
    layout: "/",
    show: true,
  },
  {
    path: "courses/:code/:id",
    name: "Your Courses",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: Course,
    layout: "/",
    show: false,
    exact: true,
  },
  {
    path: "courses/:code/assignment/:assignmentId",
    name: "Assignments",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: AssignmentView,
    layout: "/",
    show: false,
  },
  {
    divider: true,
    show: true,
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
    title: "Documentation",
    show: false,
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
    name: "Getting started",
    icon: FlashOn,
    show: false,
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
    name: "Foundation",
    icon: Palette,
    show: false,
  },
  {
    href: "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
    name: "Components",
    icon: Dns,
    show: false,
  },
];
export default routes;
