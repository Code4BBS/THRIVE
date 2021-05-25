import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import Divider from "@material-ui/core/Divider";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import formatDate from "./formatDate.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

// const Clicked = () => {
//   window.location.href = (`/admin/quora/${}`)
// }

const ImgMediaCard = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => (window.location.href = `/admin/quora/${props.id}`)}
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
export default ImgMediaCard;
