import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  Grid,
  Paper,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import MessageCard from "./../../../components/Custom/MessageCard/MessageCard.js";
import componentStyles from "assets/theme/views/admin/profile.js";

const useStyles = makeStyles(componentStyles);

const ChatRoom = ({ user, cookies }) => {
  const classes = useStyles();

  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [typingName, setTypingName] = useState("");

  const courseId = window.location.pathname.split("/")[3];

  //Setting Up Socket
  const token = cookies.cookies.JWTClient;
  let socket = io.connect(`http://localhost:3000`, {
    withCredentials: true,
    query: { token },
  });
  socket.emit("join", courseId);
  socket.on("display", (data) => onDisplay(data));
  socket.on("newMessage", (newMessage) => onMessageRecieved(newMessage));

  let typing = null;
  let timeout = undefined;

  const getPreviousMessages = () => {
    axios
      .get(`/api/v1/course/chat-room/${courseId}`)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          setChatMessages(response.data.data.chatMessages);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getPreviousMessages();
  }, []);

  const onMessageRecieved = (newMessage) => {
    const newChatMessages = [...chatMessages];
    newChatMessages.push(newMessage);

    setChatMessages(newChatMessages);
  };

  const onPostMessage = (e, message) => {
    e.preventDefault();
    if (message === "") alert("Empty Message!");
    else {
      const data = {
        user: user,
        message: message,
        courseId: courseId,
        createdAt: Date.now(),
      };
      socket.emit("message", data);
      document.getElementById("message").value = "";
    }
  };

  const typingTimeout = () => {
    typing = false;
    socket.emit("typing", {
      user: user,
      typing: false,
      courseId: courseId,
    });
  };

  const keypress = (e, message) => {
    timeout = setTimeout(typingTimeout, 100);
    if (e.which != 13) {
      typing = true;
      socket.emit("typing", {
        user: user,
        typing: true,
        courseId: courseId,
      });
      clearTimeout(timeout);
    } else {
      clearTimeout(timeout);
      typingTimeout();
      onPostMessage(e, message);
    }
  };

  const onDisplay = (data) => {
    if (data.typing === true) setTypingName(`${data.user.name} is typing...`);
    else setTypingName(``);
  };

  let chats = null;
  if (isLoading) chats = <h5>Loading....</h5>;
  else if (!isLoading && chatMessages.length > 0) {
    chats = <MessageCard chatMessages={chatMessages} />;
  } else chats = <h5>No messages in class yet !!</h5>;

  return (
    <div
      className="content"
      style={{
        position: " relative",
        minHeight: "100vh",
        fontSize: "1.1em",
      }}
    >
      <Grid container>
        <Grid item xs={12} xl={1}></Grid>
        <Grid
          item
          xs={12}
          xl={10}
          component={Box}
          marginBottom="3rem"
          classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
        >
          <Paper
            style={{ padding: "2px 20px" }}
            classes={{ root: classes.root }}
          >
            {chats}
            {/* <p>{typingName}</p> */}
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={10} lg={10}>
                  <FormGroup>
                    <FormControl
                      variant="filled"
                      width="100%"
                      style={{
                        marginBottom: "1rem!important",
                      }}
                      required
                    >
                      <FilledInput
                        style={{
                          paddingLeft: "0.75rem",
                          paddingRight: "0.75rem",
                        }}
                        type="text"
                        required
                        classes={{ input: classes.searchInput }}
                        onKeyPress={(e) =>
                          keypress(e, document.getElementById("message").value)
                        }
                        placeholder="Write Your Message"
                        id="message"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item xs={2} lg={2}>
                  <Button
                    onClick={(e) =>
                      onPostMessage(e, document.getElementById("message").value)
                    }
                    style={{ border: "0", marginLeft: "-15px" }}
                  >
                    <SendIcon style={{ padding: "0", fontSize: "1.8em" }} />
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} xl={1}></Grid>
      </Grid>
    </div>
  );
};

export default ChatRoom;
