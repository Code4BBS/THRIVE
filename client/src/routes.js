// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
// import CollegeAdmin from "views/admin/CollegeAdmin/collegeAdmin";
import CalendarView from "views/admin/Classroom/Calendar";
import CollegeMain from "views/admin/CollegeAdmin/collegeMain";
import NewCourse from "views/admin/CollegeAdmin/NewCourse.js";
import CourseTable from "views/admin/CollegeAdmin/Courses.js";
import CustomerListView from "views/admin/customer/CustomerListView/index.js";
import ProjectBoard from "views/admin/Project/ProjectBoard.js";
import AddProject from "views/admin/Project/AddProject.js";
import Project from "views/admin/Project/Project.js";
import EditProject from "views/admin/Project/EditProject.js";
import ProjectTable from "views/admin/Project/ProjectTable.js";
import Quora from "views/admin/Quora/index.js";
import Question from "views/admin/Quora/Question.js";
import File from "views/admin/fileUpload";
import Classroom from "./views/admin/Classroom/Classroom";
import Course from "./views/admin/Classroom/Course";
import AssignmentView from "./views/admin/Classroom/AssignmentView";
import AddAssignment from "./views/admin/Classroom/AddAssignment";
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
import ContactSupportTwoToneIcon from "@material-ui/icons/ContactSupportTwoTone";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CreateIcon from "@material-ui/icons/Create";
import EventIcon from "@material-ui/icons/Event";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

var routes = [
  {
    path: "index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/",
    show: true,
    role: ["user", "Teacher", "admin", "collegeAdmin"],
  },

  {
    path: "user-profile",
    name: "User Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/",
    show: true,
    role: ["user", "Teacher", "admin", "collegeAdmin"],
  },
  {
    path: "discover",
    name: "Discover",
    icon: PeopleIcon,
    iconColor: "Primary",
    component: CustomerListView,
    layout: "/",
    show: true,
    role: ["user", "admin"],
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
    role: ["user", "admin"],
  },
  {
    path: "projects/myProjects",
    name: "My Projects",
    icon: CreateIcon,
    iconColor: "Primary",
    component: ProjectTable,
    layout: "/",
    show: false,
    role: ["user", "admin"],
  },

  {
    path: "projects/add",
    name: "Add Project",
    icon: CreateIcon,
    iconColor: "Primary",
    component: AddProject,
    layout: "/",
    show: false,
    role: ["user", "admin"],
  },

  {
    path: "projects/edit/:id",
    name: "Edit Project",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Primary",
    component: EditProject,
    layout: "/",
    show: false,
    role: ["user", "admin"],
  },
  {
    path: "projects/:id",
    name: "Demo Project",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Primary",
    component: Project,
    layout: "/",
    show: false,
    role: ["user", "admin"],
  },
  {
    path: "projects",
    name: "Projects",
    icon: EmojiObjectsIcon,
    iconColor: "PrimaryLight",
    component: ProjectBoard,
    layout: "/",
    show: true,
    role: ["user", "admin"],
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
    role: ["user", "admin"],
  },
  {
    path: "quora",
    name: "Quora",
    icon: ContactSupportTwoToneIcon,
    iconColor: "Warning",
    component: Quora,
    layout: "/",
    show: true,
    role: ["user", "admin"],
  },
  {
    path: "maps",
    name: "Maps",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/",
    show: true,
    role: ["user", "admin", "collegeAdmin", "Teacher"],
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
    role: ["collegeAdmin"],
  },
  {
    path: "courses/all",
    name: "All Courses",
    icon: CreateIcon,
    iconColor: "Primary",
    component: CourseTable,
    layout: "/",
    show: false,
    role: ["collegeAdmin"],
  },
  {
    path: "courses/new-course",
    name: "All Courses",
    icon: CreateIcon,
    iconColor: "Primary",
    component: NewCourse,
    layout: "/",
    show: false,
    role: ["collegeAdmin"],
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
    role: ["user", "admin", "Teacher"],
  },
  {
    path: "calendar",
    name: "Calendar",
    icon: EventIcon,
    iconColor: "Primary",
    component: CalendarView,
    layout: "/",
    show: true,
    role: ["user", "admin"],
  },

  {
    path: "new-assignment/:id",
    name: "Add Assignment",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: AddAssignment,
    layout: "/",
    show: false,
    role: ["Teacher"],
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
    role: ["user", "admin", "Teacher"],
  },
  {
    path: "assignment/:id",
    name: "Assignments",
    icon: LibraryBooksIcon,
    iconColor: "Primary",
    component: AssignmentView,
    layout: "/",
    show: false,
    role: ["user", "admin", "Teacher"],
  },
  {
    divider: true,
    show: false,
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
