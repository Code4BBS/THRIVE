import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

function Notification() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    "You have no Notifications",
  ]);

  const handleClick = (event) => {
    getNotifications();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotifications = () => {
    axios
      .get("/api/v1/user/profile?required=notifications", {
        withCredentials: true,
      })
      .then((response) => {
        let userNotifications = response.data.data.user;
        setNotifications(userNotifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const cardContent = (
    <Card className={classes.root}>
      <CardContent>
        {notifications.map((message, key) => (
          <Typography>{message}</Typography>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <SvgIcon
        style={{
          color: "white",
          width: "25px",
          height: "30px",
          marginTop: "8px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <NotificationsIcon />
      </SvgIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {cardContent}
      </Popover>
    </div>
  );
}

export default Notification;
