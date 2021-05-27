import React, {Component} from "react";

import {
    Card,
    CardHeader,
    CardContent,
    makeStyles,
    Grid,
    Divider,
    Box,
    Typography,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    FilledInput,
    TextField,
    Avatar
} from "@material-ui/core";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import axios from "axios";

class Chat extends Component {
    state = {
        messages : []
    }
    componentDidMount = () => {
        let url = window.location.pathname.split('/');
        let courseId = url[3];
        axios.get(`/api/v1/course/chat-room/${courseId}`).then(res => {
            console.log(res);
            this.setState({messages : res.data.data.chatMessages})
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container style = {{margin : "10px"}}>
                    <Grid item xs = {8} xl = {8} md = {8}>
                        <TextField fullWidth></TextField>
                    </Grid>
                    <Grid item xs = {4} xl = {4} md = {4}>
                        <Button>
                            send
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    {this.state.messages.map((el,idx) => {
                      return(
                              <Grid style = {{margin : "10px"}}>
                                <Grid item xs>
                                    <Card>
                                        <CardHeader
                                            subheader = "Navaneeth"
                                        >
                                        </CardHeader>
                                        <Divider/>
                                        <CardContent>
                                            <Typography variant = "p">It is very great that you joined</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                              </Grid>
                      ) 
                    })}
                </Grid>
            </>
        )
    }
}

export default Chat;