import React, { useEffect } from "react";
import { Divider, Avatar, Grid } from "@material-ui/core";
import FormatDate from "./../../../views/admin/Quora/formatDate";

const urlify = (text) => {
  var urlRegex =
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  return text.replace(urlRegex, function (url) {
    return `<a href="${url}" target="_blank"> ${url} </a>`;
  });
};

const Messages = ({ chatMessages }) => {
  const scrollToBottom = () => {
    const elem = document.getElementById("chat-elem");
    if (elem) elem.scrollTop = elem.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div
      id="chat-elem"
      style={{
        height: "700px",
        overflowY: "scroll",
        overflowX: "hidden",
        paddingRight: "10px",
      }}
    >
      {chatMessages.map((chatMessage, index) => {
        return (
          <React.Fragment key={index}>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              style={{ margin: "10px 0px" }}
            >
              <Grid item>
                <Avatar alt="avatar" src={chatMessage.user.image} />
              </Grid>
              <Grid style={{ justifyContent: "left" }} item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {chatMessage.user.name}
                </h4>

                <p
                  style={{ textAlign: "left" }}
                  dangerouslySetInnerHTML={{
                    __html: urlify(chatMessage.message),
                  }}
                >
                  {/* {chatMessage.message} */}
                </p>
                <p style={{ textAlign: "right", color: "gray" }}>
                  - {FormatDate(chatMessage.createdAt)}
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "0" }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Messages;
