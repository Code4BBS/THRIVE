import React, {Component} from 'react';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import Divider from '@material-ui/core/Divider';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import {Grid, Box, Container, withStyles, CardHeader, Card, Typography, CardContent, TextField, Button } from "@material-ui/core";

class QuoraCont extends Component {
    state = {
        question : {},
        isLoading : false,
        answers : [],
        answersLength : 0,
        newAnswer : ""
    }
    getQuestion = () => {
        this.setState({isLoading : true})
        let url = window.location.pathname.split('/');
        let qId = url[3];
        axios.get(`/api/v1/quora/questions/${qId}`).then((res) => {
            this.setState({
                isLoading : false,
                question : res.data.question,   
                answersLength : res.data.question.answers.length,
                answers : res.data.question.answers
            })
            console.log(res.data.question)
            console.log(this.state.question.user)
        })
    }
    addAnswer = () => {
        let answer = {
            answer : this.state.newAnswer,
            isAnonymous : 0
        }
        axios.post(`/api/v1/quora/answers/${this.state.question._id}`, answer).then(res => {            
            // this.setState({question : res.data.finalQuestion ,answersLength : res.data.finalQuestion.answers.length, newAnswer : ""});
            // console.log(res.data.finalQuestion.answers);
            // this.setState({answers : res.data.finalQuestion.answers});
            this.getQuestion();
        })
    }
    componentDidMount = () => {
        this.getQuestion();
    }
    InputChanged = (e) => {
        e.preventDefault();
        this.setState({newAnswer : e.target.value});
        console.log(e.target.value);
    }
    upVoteClicked = () => {
        axios.post(`/api/v1/quora/questions/upvote/${this.state.question._id}`,{}).then((res) => {
            this.setState({question : res.data.newQuestion});
            console.log(res);
        })
    }
    downVoteClicked = () => {
        axios.post(`/api/v1/quora/questions/downvote/${this.state.question._id}`,{}).then((res) => {
            this.setState({question : res.data.newQuestion});
            console.log(res);
        })
    }
    render() {
        console.log(this.props)
        const { classes } = this.props;
        let upvoteColor = "";
        let downvoteColor = "";
        console.log(this.state.question);
        return(
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
                        classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
                        >
                            <Card classes={{root: classes.cardRoot + " " + classes.cardRootSecondary,}}>
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
                                  classes={{ root: classes.cardHeaderRoot }}>
                                </CardHeader>
                                <CardContent>
                                <Box component={Typography} variant="h6" paddingTop=".25rem" paddingBottom=".25rem" fontSize=".75rem!important"
                                    letterSpacing=".04em" marginBottom="1.5rem!important" classes={{ root: classes.typographyRootH6 }}
                                >
                                 Asked by Navaneeth
                                </Box>
                                <Box>
                                <Grid container>
                                    <Grid item xs={12} lg={12}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant = "p" component = "p">
                                                {this.state.question.questionBody}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton onClick = {() => this.upVoteClicked()}>
                                            <Typography>{this.state.question.upvotes}</Typography>
                                            <ThumbUpOutlinedIcon color = {upvoteColor}/>
                                        </IconButton>       
                                    </Grid>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton onClick = {() => this.downVoteClicked()}>
                                            <Typography>{this.state.question.downvotes}</Typography>
                                            <ThumbDownOutlinedIcon color = {downvoteColor}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>{this.state.answersLength}</Typography>
                                            <QuestionAnswerOutlinedIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                </Box>
                                </CardContent>
                            
                                <CardContent classes={{root: classes.cardRoot + " " + classes.cardRootSecondary,}}>
                                  <Grid container>
                                    <Grid item xs = {8}>
                                        <TextField
                                        id="write-comment"
                                        placeholder="Add Answer"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange = {(e) => this.InputChanged(e)}
                                        />
                                    </Grid>
                                    <Grid item xs = {4}>
                                        <Button variant="contained" color="primary" onClick = {() => this.addAnswer()}>Add Answer</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                                  <Grid container>
                                    <Grid item xs = {12}>
                                        <Card>
                                            {this.state.answers.map((el,id) => {
                                                return(
                                                <CardContent key = {id}>
                                                    <Typography variant = "h5">{el.user.name}</Typography>
                                                    <Divider/>
                                                    <Typography variant = "p">{el.answer}</Typography>
                                                </CardContent>
                                                )
                                                })
                                            }
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
        )
    }
}

export default withStyles(componentStyles)(QuoraCont);