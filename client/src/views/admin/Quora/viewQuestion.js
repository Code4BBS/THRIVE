import React, {Component} from 'react';
import Quora from "./Quora.js";
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
    getQuestion = (id) => {
        this.setState({isLoading : true})
        axios.get(`/api/v1/quora/questions/${id}`).then((res) => {
            // console.log(res.data.question);
            this.setState({
                isLoading : false,
                question : res.data.question,   
                answersLength : res.data.question.answers.length,
                answers : res.data.question.answers
            })
            console.log(res)
        })
    }
    addAnswer = () => {
        let answer = {
            answer : this.state.newAnswer,
            isAnonymous : 0
        }
        axios.post(`/api/v1/quora/answers/${this.state.question._id}`, answer).then(res => {
            // console.log(res.data.finalQuestion.answers);
            // console.log(this.state.answers)
            // let newAnswer = 
            
            this.setState({question : res.data.finalQuestion ,answersLength : res.data.finalQuestion.answers.length, newAnswer : ""});
            // this.setState({answers : [...res.data.finalQuestion.answers]})
//.............................xxxxx   //Facing issue with updating answers array. Need to fix later
        })
    }
    componentDidMount = () => {
        this.getQuestion(this.props.id);
    }
    InputChanged = (e) => {
        e.preventDefault();
        this.setState({newAnswer : e.target.value});
        console.log(e.target.value);
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                {!this.state.isLoading ? (
                <>
                    {/* <Header />
                    <Container
                    maxWidth={false}
                    component={Box}
                    marginTop="-6rem"
                    classes={{ root: classes.containerRoot }}
                    > */}
                    {/* <Quora QuoraQuestions = {this.state.questions}/> */}
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
                                <Box
                                    component={Typography}
                                    variant="h6"
                                    // color={theme.palette.gray[600] + "!important"}
                                    paddingTop=".25rem"
                                    paddingBottom=".25rem"
                                    fontSize=".75rem!important"
                                    letterSpacing=".04em"
                                    marginBottom="1.5rem!important"
                                    classes={{ root: classes.typographyRootH6 }}
                                >
                                    Question From Navaneeth
                                </Box>
                                <Box>
                                <Grid container>
                                    <Grid item xs={12} lg={12}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant = "p" component = "p">
                                                {/* A question is an utterance which typically functions as a request for information, which is expected to be provided in the form of an answer. Questions can thus be understood as a kind of illocutionary act in the field of pragmatics or as special kinds of propositions in frameworks of formal semantics such as alternative semantics or inquisitive semantics. Questions are often conflated with interrogatives, which are the grammatical forms typically used to achieve them. Rhetorical questions, for example, are interrogative in form but may not be considered true questions as they are not expected to be answered. Conversely, non-interrogative grammatical structures may be considered questions as in the case of the imperative sentence "tell me your name." */}
                                                {this.state.question.questionBody}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>{this.state.question.upvotes}</Typography>
                                            <ThumbUpOutlinedIcon/>
                                        </IconButton>       
                                    </Grid>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>{this.state.question.downvotes}</Typography>
                                            <ThumbDownOutlinedIcon/>
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
                                        // label="Label"
                                        // style={{ margin: 1 }}
                                        placeholder="Add Answer"
                                        // helperText="Full width!"
                                        fullWidth
                                        // margin="normal"
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
                                                    <Typography variant = "h5">{el.user}</Typography>
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
                    {/* </Container> */}
                </>
                ) : null}
            </div>
        )
    }
}

export default withStyles(componentStyles)(QuoraCont);