import React, { Component } from "react";
import axios from "axios";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

import {
  Box,
  Button,
  Container,
  CardHeader,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import BlockIcon from "@material-ui/icons/Block";

import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";

class QuoraCont extends Component {
  state = {
    question: {},
    isLoading: false,
    answers: [],
    answersLength: 0,
    newAnswer: "",
    isAnonymous: false,
    askedBy: "",
    deleteClicked: false,
    blacklistClicked: false,
    askedById: null,
  };

  getQuestion = () => {
    this.setState({ isLoading: true });
    const url = window.location.pathname.split("/");
    const qId = url[2];
    axios.get(`/api/v1/quora/questions/${qId}`).then((res) => {
      this.setState({
        isLoading: false,
        question: res.data.question,
        answersLength: res.data.question.answers.length,
        answers: res.data.question.answers,
      });
      if (!res.data.question.isAnonymous) {
        this.setState({
          askedBy: res.data.question.user.name,
          askedById: res.data.question.user._id,
        });
      }
    });
  };

  addAnswer = () => {
    let answer = {
      answer: this.state.newAnswer,
      isAnonymous: this.state.isAnonymous,
    };
    axios
      .post(`/api/v1/quora/answers/${this.state.question._id}`, answer)
      .then((res) => {
        this.getQuestion();
      });
  };
  componentDidMount = () => {
    this.getQuestion();
  };
  InputChanged = (e) => {
    e.preventDefault();
    this.setState({ newAnswer: e.target.value });
  };
  toggleChanged = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      isAnonymous: !prevState.isAnonymous,
    }));
  };
  upVoteClicked = () => {
    axios
      .post(`/api/v1/quora/questions/upvote/${this.state.question._id}`, {})
      .then((res) => {
        this.setState({ question: res.data.newQuestion });
      });
  };
  downVoteClicked = () => {
    axios
      .post(`/api/v1/quora/questions/downvote/${this.state.question._id}`, {})
      .then((res) => {
        this.setState({ question: res.data.newQuestion });
      });
  };
  deleteConfirmed = () => {
    axios
      .delete(`/api/v1/quora/questions/${this.state.question._id}`)
      .then((res) => {
        window.location.href = `/discussion`;
      });
  };
  blacklistQuestion = () => {
    axios
      .patch(`/api/v1/quora/questions/blacklist/${this.state.question._id}`)
      .then((res) => {
        window.location.href = `/discussion`;
      });
  };
  render() {
    const { classes } = this.props;
    let upvoteColor = "";
    let downvoteColor = "";
    let deleteButton;
    let blacklistButton;

    if (
      this.state.question != null &&
      this.state.question.isAnonymous === false &&
      this.state.askedById == this.props.user._id
    ) {
      console.log(this.state.askedById == this.props.user._id);
      deleteButton = (
        <IconButton
          onClick={() => this.setState({ deleteClicked: true })}
          style={{ padding: "0!important" }}
        >
          <DeleteIcon
            style={{
              height: "18px",
              width: "18px",
              marginRight: "0.2rem",
              padding: "0 !important",
            }}
          />
        </IconButton>
      );
      console.log(deleteButton);
    } else {
      deleteButton = null;
    }
    if (this.state.question != null && this.props.user.role == "admin") {
      blacklistButton = (
        <IconButton
          onClick={() => this.setState({ blacklistClicked: true })}
          style={{ padding: "0!important" }}
        >
          <BlockIcon
            style={{
              height: "18px",
              width: "18px",
              marginRight: "0.2rem",
              padding: "0 !important",
            }}
          />
        </IconButton>
      );
    } else {
      blacklistButton = null;
    }
    const deleteModal = (
      <div>
        <Dialog
          open={this.state.deleteClicked}
          onClose={() => {
            this.setState({ deleteClicked: false });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ color: "white", backgroundColor: "red" }}
                  onClick={() => this.deleteConfirmed()}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => this.setState({ deleteClicked: false })}
                  style={{ color: "white", backgroundColor: "green" }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
    const blacklistModal = (
      <div>
        <Dialog
          open={this.state.blacklistClicked}
          onClose={() => {
            this.setState({ blacklistClicked: false });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Are you willing to blacklist this question?
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ color: "white", backgroundColor: "red" }}
                  onClick={() => this.blacklistQuestion()}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => this.setState({ blacklistClicked: false })}
                  style={{ color: "white", backgroundColor: "green" }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
    return (
      <div>
        {!this.state.isLoading ? (
          <>
            <Header />
            <Container
              maxWidth={false}
              component={Box}
              marginTop="-6rem"
              classes={{ root: classes.containerRoot }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  xl={8}
                  component={Box}
                  marginBottom="3rem"
                  classes={{
                    root: classes.gridItemRoot + " " + classes.order2,
                  }}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  {deleteModal}
                  {blacklistModal}
                  <Card
                    classes={{
                      root: classes.cardRoot + " " + classes.cardRootSecondary,
                    }}
                  >
                    <CardContent>
                      <Grid
                        container
                        component={Box}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item xs="auto">
                          <Box
                            component={Typography}
                            variant="h6"
                            paddingTop=".35rem"
                            paddingBottom=".25rem"
                            fontSize=".75rem!important"
                            letterSpacing=".04em"
                            classes={{ root: classes.typographyRootH6 }}
                          >
                            {this.state.askedBy == ""
                              ? "An Anonymous User"
                              : this.state.askedBy}{" "}
                            asked
                          </Box>
                        </Grid>
                        <Grid item xs="auto">
                          <Box
                            justifyContent="flex-end"
                            display="flex"
                            flexWrap="wrap"
                          >
                            {deleteButton}
                            {blacklistButton}
                            <FacebookShareButton url={window.location.href}>
                              <FacebookIcon
                                style={{
                                  height: "18px",
                                  width: "18px",
                                  marginLeft: "0.2rem",
                                }}
                              />
                            </FacebookShareButton>
                            <WhatsappShareButton url={window.location.href}>
                              <WhatsAppIcon
                                style={{
                                  height: "18px",
                                  width: "18px",
                                  marginLeft: "0.2rem",
                                }}
                              />
                            </WhatsappShareButton>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box>
                        <Grid container>
                          <Grid item xs={12} lg={12}>
                            <Card>
                              <CardContent>
                                <Typography variant="p" component="p">
                                  {this.state.question.questionBody}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2} lg={1}>
                            <IconButton onClick={() => this.upVoteClicked()}>
                              <Typography>
                                {this.state.question.upvotes}
                              </Typography>
                              <ThumbUpOutlinedIcon color={upvoteColor} />
                            </IconButton>
                          </Grid>
                          <Grid item xs={2} lg={1}>
                            <IconButton onClick={() => this.downVoteClicked()}>
                              <Typography>
                                {this.state.question.downvotes}
                              </Typography>
                              <ThumbDownOutlinedIcon color={downvoteColor} />
                            </IconButton>
                          </Grid>
                          <Grid item xs={2} lg={1}>
                            <IconButton>
                              <Typography>
                                {this.state.answersLength}
                              </Typography>
                              <QuestionAnswerOutlinedIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>

                    <CardContent
                      classes={{
                        root:
                          classes.cardRoot + " " + classes.cardRootSecondary,
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            id="write-comment"
                            placeholder="Add Answer"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={(e) => this.InputChanged(e)}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography
                            variant="b"
                            style={{ marginRight: "30px" }}
                          >
                            {"Answer Anonymously"}
                          </Typography>
                          <Switch
                            color="primary"
                            onChange={(e) => this.toggleChanged(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.addAnswer()}
                            size="small"
                          >
                            Add Answer
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Grid container>
                      <Grid item xs={12}>
                        <Card>
                          {this.state.answers.map((el, id) => {
                            return (
                              <CardContent key={id}>
                                <Typography variant="h5">
                                  {!el.isAnonymous
                                    ? el.user.name
                                    : "An Anonymous user"}
                                </Typography>
                                <Divider />
                                <Typography variant="p">{el.answer}</Typography>
                              </CardContent>
                            );
                          })}
                        </Card>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </>
        ) : null}
      </div>
    );
  }
}

export default withStyles(componentStyles)(QuoraCont);
