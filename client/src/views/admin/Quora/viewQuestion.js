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
        questions : [],
        isLoading : false,
    }
    getAllQuestions = () => {
        this.setState({isLoading : true})
        axios.get('/api/v1/quora/questions').then((res) => {
            console.log(res.data.questions);
            this.setState({
                isLoading : false,
                questions : res.data.questions
            })
        })
    }
    componentDidMount = () => {
        this.getAllQuestions();
    }
    render() {
        const { classes } = this.props;
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
                                                A question is an utterance which typically functions as a request for information, which is expected to be provided in the form of an answer. Questions can thus be understood as a kind of illocutionary act in the field of pragmatics or as special kinds of propositions in frameworks of formal semantics such as alternative semantics or inquisitive semantics. Questions are often conflated with interrogatives, which are the grammatical forms typically used to achieve them. Rhetorical questions, for example, are interrogative in form but may not be considered true questions as they are not expected to be answered. Conversely, non-interrogative grammatical structures may be considered questions as in the case of the imperative sentence "tell me your name."
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>36</Typography>
                                            <ThumbUpOutlinedIcon/>
                                        </IconButton>       
                                    </Grid>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>4</Typography>
                                            <ThumbDownOutlinedIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs = {2} lg = {1}>
                                        <IconButton>
                                            <Typography>3</Typography>
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
                                        />
                                    </Grid>
                                    <Grid item xs = {4}>
                                        <Button variant="contained" color="primary">Add Answer</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                                  <Grid container>
                                    <Grid item xs = {12}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant = "h5">Shrirang Deshmukh</Typography>
                                                <Divider/>
                                                <Typography variant = "p">I was talking to a friend on WhatsApp video call and I 
                                                was trying to explain a funny situation from a picture I have in my phone. So I 
                                                thought let me send the picture instead. I opened my photo gallery and started 
                                                scrolling to look for that picture. But before I find that picture, I found the following 
                                                picture:</Typography>
                                            </CardContent>
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