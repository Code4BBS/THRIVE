import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";

import formatDate from "./formatDate.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

const QuestionCard = (props) => {
  const history = useHistory();

  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/discussion/${props.id}`)}
      style={{ boxShadow: "0 0 1rem 0 rgba(136, 152, 170,.35)" }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {!props.isAnonymous ? props.name : "An Anonymous user"} Asked
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.question}
          </Typography>
          <br />
          <Typography variant="h6" color="textSecondary" component="i">
            {formatDate(props.time)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "30px",
          }}
        >
          <Typography>{props.upvotes}</Typography>
          <ThumbUpOutlinedIcon />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "30px",
          }}
        >
          <Typography>{props.downvotes}</Typography>
          <ThumbDownOutlinedIcon />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "30px",
          }}
        >
          <Typography>{props.answers.length}</Typography>
          <QuestionAnswerOutlinedIcon />
        </div>
      </CardActions>
    </Card>
  );
};
export default QuestionCard;
