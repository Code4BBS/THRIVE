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
      <CardActions>
        <Typography>{props.upvotes}</Typography>
        <ThumbUpOutlinedIcon />
        <Typography>{props.downvotes}</Typography>
        <ThumbDownOutlinedIcon />
        <Typography>{props.answers.length}</Typography>
        <QuestionAnswerOutlinedIcon />
      </CardActions>
    </Card>
  );
};
export default QuestionCard;
