import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Notification.css";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import axios from "axios";

import SvgIcon from "@material-ui/core/SvgIcon";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import {
  UserX,
  Users,
  UserCheck,
  FileText,
  Book,
  Bookmark,
} from "react-feather";

const useStyles = makeStyles({
  root: {
    width: "min(360px, 90vw)",
    boxShadow: "0px 0px",
    padding: 0,
    margin: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  badge: {
    color: "red",
  },
  dot: {
    color: "#fc03a9",
    backgroundColor: "#fc03a9",
  },
  popover: {
    padding: 0,
  },
  tile: {
    transition: "0.3s ease-in-out",
    padding: "4px 10px",
    borderTop: "1px solid rgb(0,0,0,0.2)",
    display: "flex",
    "&:hover": {
      backgroundColor: "rgb(65, 153, 242)",
      color: "rgb(255,255,255)",
      boxShadow: "0px 3px 5px rgb(0,0,0,0.4)",
    },
    cursor: "pointer",
  },
  head: {
    fontWeight: 600,
  },
  desc: {
    fontSize: "14px",
  },
});

const Notification = ({ user, history, color }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      message: "You have no Notifications",
      link: "NULL",
    },
  ]);

  const [status, setNotificationStatus] = useState(user.notificationsSeen);
  // //console.log(status);
  const handleClick = (event) => {
    getNotifications();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotifications = () => {
    axios
      .get("/api/v1/user/notifications", {
        withCredentials: true,
      })
      .then((response) => {
        //console.log(response);
        let userNotifications = response.data.data.notifications;
        let notificationsInorder = userNotifications.reverse();
        let notificationStatus = response.data.data.status;
        //console.log(notificationsInorder);
        if (notificationsInorder.length > 0)
          setNotifications(notificationsInorder);
        setNotificationStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectToProject = (projectId) => {
    let projectUrl = `/projects/${projectId}`;
    history.push(projectUrl);
    // window.location.pathname = projectUrl;
  };
  const redirectToAssignment = (projectId) => {
    let projectUrl = `/assignment/${projectId}`;
    history.push(projectUrl);
    // window.location.pathname = projectUrl;
  };
  const redirectToCourse = (course) => {
    let courseUrl = `/courses/${course.code}/${course._id}`;
    history.push(courseUrl);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const makeNotificationIcon = (notification) => {
    switch (notification.type) {
      case "profileMatch":
        return <FileText color="darkblue" size={20} />;
      // break;
      case "collaboratorAdd":
        return <Users color="blue" size={20} />;

      case "joinRequest":
        return (
          <Avatar
            src={notification.requester.image}
            style={{ height: "30px", width: "30px" }}
          />
        );

      case "requestAccept":
        return <UserCheck color="green" size={20} />;

      case "requestReject":
        return <UserX color="#f54242" size={20} />;

      case "courseCreated":
        return (
          <SupervisorAccountIcon style={{ height: "20px", width: "20px" }} />
        );

      case "courseEnrolled":
        return <Book size={20} />;

      case "assignment":
        return <Bookmark size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  const makeNotificationMessage = (notification) => {
    switch (notification.type) {
      case "profileMatch":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.project.title}
            </Typography>
            <Typography className={classes.desc}>
              Matches your profile.
            </Typography>
          </div>
        );
      // break;
      case "collaboratorAdd":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.project.title}
            </Typography>
            <Typography className={classes.desc}>
              You are added as a collaborator.
            </Typography>
          </div>
        );

      case "joinRequest":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.requester.name}
            </Typography>
            <Typography className={classes.desc}>
              Requested to join your project
              <br />
              <b>{notification.project.title}</b>
            </Typography>
          </div>
        );

      case "requestAccept":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.project.title}
            </Typography>
            <Typography className={classes.desc}>
              Your request is accepted by the owner.
            </Typography>
          </div>
        );

      case "requestReject":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.project.title}
            </Typography>
            <Typography className={classes.desc}>
              Your request is rejected by the owner.
            </Typography>
          </div>
        );
      case "assignment":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.project.title}
            </Typography>
            <Typography className={classes.desc}>
              {notification.message}
            </Typography>
          </div>
        );

      case "courseCreated":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.course.name}
            </Typography>
            <Typography className={classes.desc}>
              Admin created course with you as teacher.
            </Typography>
          </div>
        );

      case "courseEnrolled":
        return (
          <div>
            {" "}
            <Typography className={classes.head}>
              {notification.course.name}
            </Typography>
            <Typography className={classes.desc}>
              You are enrolled in this course of {notification.course.teacher}
            </Typography>
          </div>
        );

      default:
        return (
          <div>
            <Typography className={classes.head}>
              {notification.message}
            </Typography>
          </div>
        );
    }
  };

  const cardContent = (
    <Card className={classes.root}>
      <CardHeader
        title="NOTIFICATIONS"
        style={{ padding: "10px 0px 0px 10px", margin: 0 }}
      />
      <CardContent style={{ padding: 0, margin: 0 }}>
        {notifications.map((notification, key) => {
          return (
            <div
              className={classes.tile}
              onClick={() => {
                //console.log(notification);
                if (notification.type == "assignment") {
                  redirectToAssignment(notification.project._id);
                } else if (notification.project)
                  redirectToProject(notification.project._id);
                else if (notification.course)
                  redirectToCourse(notification.course);
                else redirectToProject(notification.projectId);
              }}
              key={key}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  margin: "0px 10px 0px 3px",
                }}
              >
                {makeNotificationIcon(notification)}
              </div>
              {makeNotificationMessage(notification)}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Badge
        classes={{ dot: classes.dot }}
        overlap="circle"
        variant="dot"
        invisible={status}
      >
        <SvgIcon
          style={{
            color: "white",
            width: "25px",
            height: "30px",

            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <NotificationsIcon style={{ color: color ? color : "white" }} />
        </SvgIcon>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className={classes.popover}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {cardContent}
      </Popover>
    </div>
  );
};

export default Notification;
