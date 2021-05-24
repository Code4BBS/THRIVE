import React, {Component} from "react";
import componentStyles from "assets/theme/views/admin/icons.js";
import { Typography, withStyles, Grid } from "@material-ui/core";
// @material-ui/core components
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons components
import CreateIcon from '@material-ui/icons/Create';


class NewQuestionModal extends Component {
  state = {
    isAnanymous : false,
    newQuestion : ""
  }
  anonymousChanged = (e) => {
    e.preventDefault();
    this.setState(prevState => ({isAnanymous : !prevState.isAnanymous}));
    console.log(this.state);
  }
  inputChange = (e) => {
    e.preventDefault();
    this.setState({newQuestion : e.target.value});
    console.log(this.state);
  }
    render() {
        const { classes } = this.props;
        const cardClasses = { root: classes.cardRoot }
        // const buttonClasses = { root: classes.buttonRoot };
        const cardContentClasses = { root: classes.cardContent };
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="down" ref={ref} {...props} />;
        });
        const handleClose = () => {
            this.props.modalClosed();
        }
        return(
            <>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Slide in alert dialog
            </Button> */}
            <Dialog
              maxWidth="xs"
              open={this.props.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <Card classes={cardClasses}>
                  <CardContent classes={cardContentClasses}>
                    <Box
                      color = "gray"
                      textAlign="center"
                      marginBottom="1rem"
                      marginTop=".5rem"
                      fontSize="1rem"
                    >
                    </Box>
                    <FormControl variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important">
                          <Grid container>
                              <Grid item xs = {8}>
                                <Typography variant = "p">Post Ananymously</Typography>
                              </Grid>
                              <Grid item xs = {4}>
                                <Switch color="primary" onChange = {(e) => this.anonymousChanged(e)} />
                              </Grid>
                          </Grid>
                    </FormControl>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <FilledInput
                        autoComplete="off"
                        type="textarea"
                        placeholder="Write your Question"
                        startAdornment={
                          <InputAdornment position="start">
                            <CreateIcon/>
                          </InputAdornment>
                        }
                        onChange = {(e) => this.inputChange(e)}
                      />
                    </FormControl>
                    {/* <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Remeber me"
                      labelPlacement="end"
                      classes={checkboxClasses}
                    /> */}
                    <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                      <Button color="primary" variant="contained">
                        Add Question
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          </>
        )
    }
}


export default withStyles(componentStyles)(NewQuestionModal);
