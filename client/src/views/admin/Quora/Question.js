//Rectify the username value  (Currently Hard Coded)
import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import {
  Grid,
  Box,
  Container,
  withStyles,
  CardHeader,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Switch,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    let url = window.location.pathname.split("/");
    let qId = url[2];
    axios.get(`/api/v1/quora/questions/${qId}`).then((res) => {
      console.log(res.data);
      this.setState({
        isLoading: false,
        question: res.data.question,
        answersLength: res.data.question.answers.length,
        answers: res.data.question.answers,
      });
      if (!res.data.question.isAnonymous) {
        this.setState({ askedBy: res.data.question.user.name });
      }

      console.log(this.state.question.user);
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
        // this.setState({question : res.data.finalQuestion})
      });
  };
  componentDidMount = () => {
    this.getQuestion();
  };
  InputChanged = (e) => {
    e.preventDefault();
    this.setState({ newAnswer: e.target.value });
    // console.log(e.target.value);
  };
  toggleChanged = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      isAnonymous: !prevState.isAnonymous,
    }));
    // console.log(this.state)
  };
  upVoteClicked = () => {
    axios
      .post(`/api/v1/quora/questions/upvote/${this.state.question._id}`, {})
      .then((res) => {
        this.setState({ question: res.data.newQuestion });
        // console.log(res);
      });
  };
  downVoteClicked = () => {
    axios
      .post(`/api/v1/quora/questions/downvote/${this.state.question._id}`, {})
      .then((res) => {
        this.setState({ question: res.data.newQuestion });
        // console.log(res);
      });
  };
  deleteConfirmed = () => {
    axios
      .delete(`/api/v1/quora/questions/${this.state.question._id}`)
      .then((res) => {
        window.location.href = `/quora`;
      });
  };
  render() {
    console.log(this.props);
    const { classes } = this.props;
    let upvoteColor = "";
    let downvoteColor = "";
    console.log(this.state.question);
    let deleteButton;
    if (
      this.state.question != null &&
      this.state.question.isAnonymous == false &&
      this.state.question.user._id == this.props.user._id
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
                      subheader={
                        <Grid
                          container
                          component={Box}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs="auto">
                            <Box
                              component={Typography}
                              variant="h3"
                              marginBottom="0!important"
                            >
                              Viewing A Question
                            </Box>
                          </Grid>
                        </Grid>
                      }
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
                        {/* Asked by Navaneeth */}
                        {/* {console.log(typeof this.state.question.user)} */}
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
                            {
                              console.log(el);
                            }
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
