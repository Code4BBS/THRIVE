import React, { Component } from "react";
import axios from "axios";

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
        this.setState({ askedBy: res.data.question.user.name });
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
  render() {
    const { classes } = this.props;
    let upvoteColor = "";
    let downvoteColor = "";
    let deleteButton;
    if (
      this.state.question != null &&
      this.state.question.isAnonymous === false &&
      this.state.question.user._id === this.props.user._id
    ) {
      deleteButton = (
        <IconButton
          size="large"
          onClick={() => this.setState({ deleteClicked: true })}
        >
          <DeleteIcon fontSize={"large"} />
        </IconButton>
      );
    } else {
      deleteButton = null;
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
                  onClick={this.AddQuestion}
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
                >
                  {deleteModal}
                  <Card
                    classes={{
                      root: classes.cardRoot + " " + classes.cardRootSecondary,
                    }}
                  >
                    <CardHeader
                      action={deleteButton}
                      classes={{ root: classes.cardHeaderRoot }}
                    ></CardHeader>
                    <CardContent>
                      <Box
                        component={Typography}
                        variant="h6"
                        paddingTop=".25rem"
                        paddingBottom=".25rem"
                        fontSize=".75rem!important"
                        letterSpacing=".04em"
                        marginBottom="1.5rem!important"
                        classes={{ root: classes.typographyRootH6 }}
                      >
                        Asked by{" "}
                        {this.state.askedBy == ""
                          ? "An Anonymous User"
                          : this.state.question.user.name}
                      </Box>
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
                        {/* <Grid item xs = {4}>
                                        <Button variant="contained" color="primary" onClick = {() => this.addAnswer()}>Add Answer</Button>
                                    </Grid> */}
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
