import React, {Component} from "react";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// import Box from "@material-ui/core/Box";
import componentStyles from "assets/theme/views/admin/icons.js";
import CreateIcon from "@material-ui/icons/Create";
import QuestionCard from './QuestionCard';
import { withStyles, Button, Typography, Switch } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

class Quora extends Component {
  state = {
    creating : false,
    newQuestion : "",
    isAnonymous : false
  }
  handleClose = () => {
    this.setState({creating : false, newQuestion : "", isAnonymous : false});
  }
  handleOpen = () => {
    this.setState({creating : true});
  }
  inputChange = (e) => {
    e.preventDefault();
    this.setState({newQuestion : e.target.value});
    console.log(e.target.value)
  }
  toggleChanged = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
        isAnonymous : !prevState.isAnonymous
    }));
    console.log(this.state)
  }
  AddQuestion = () => {
    let question = {
      isAnonymous : this.state.isAnonymous,
      questionBody : this.state.newQuestion
    }
    axios.post(`/api/v1/quora/questions`,question).then(res => {
      window.location.href = `/admin/quora/${res.data.data._id}`
    })
  }
  render() {
    const { classes } = this.props;
    let ques = null;
    const Modal = (
        <div>
        <Dialog open={this.state.creating} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Write Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container>
                <Grid item xs = {8}>
                  <Typography variant = "b">Post Anonymously</Typography>
                </Grid>
                <Grid item xs = {4}>
                  <Switch color="primary" onChange = {(e) => this.toggleChanged(e)} />
                </Grid>
              </Grid>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Question"
              type="text"
              fullWidth
              onChange = {(e) => this.inputChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.AddQuestion} color="primary">
              Add Question
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
    if(this.props.QuoraQuestions.length != 0) {
      ques = this.props.QuoraQuestions.map((el,idx) => {
        let user = el.isAnonymous == 0 ? el.user.name : "Anonymous"
        return (
          <Grid item xs = {12} sm = {6} md = {4} component={Box}
          paddingLeft="15px"
          paddingRight="15px">
          <QuestionCard name = {user} isAnonymous = {el.isAnonymous} upvotes = {el.upvotes} downvotes = {el.downvotes} 
            question = {el.questionBody} answers = {el.answers} time = {el.createdAt} key = {idx} 
            id = {el._id}/>
          </Grid>
        )
      } )
    }
    return(
      <>
          <Grid container component={Box} marginBottom="39px">
          <Grid item xs={12}>
            {Modal}
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title="Recent Questions"
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
                action={
                    <IconButton color="primary"  aria-label="write a question" onClick={() => { this.handleOpen()}} 
                      className={classes.margin}>
                      <CreateIcon fontSize="large"/>
                    </IconButton>
                }
              >
              </CardHeader>
             
              <CardContent>
                <Grid container >
                    {ques}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          </Grid> 
    </>
    )
    }
}


export default withStyles(componentStyles)(Quora);

//Deleting Questions
//Delete Comment
