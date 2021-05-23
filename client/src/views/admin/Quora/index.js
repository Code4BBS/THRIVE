import React, {Component} from 'react';
import Quora from "./Quora.js";
import axios from "axios";
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/tables.js";
import { Box, Container, withStyles } from "@material-ui/core";
import ViewQuestion from "./viewQuestion";

class QuoraCont extends Component {
    state = {
        questions : [],
        isLoading : false,
        viewingQuestion : false
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
    viewQuestion = () => {
        this.setState({viewingQuestion : true});
    }
    render() {
        console.log(this.props);
        const { classes } = this.props;
        let view = (
            <>
            <Header />
                    <Container
                    maxWidth={false}
                    component={Box}
                    marginTop="-6rem"
                    classes={{ root: classes.containerRoot }}
                    >
                    <Quora QuoraQuestions = {this.state.questions} viewQuestion = {() => this.viewQuestion()} {...this.props}/>
                    {/* <ViewQuestion/> */}
            </Container>
            </>
        )
        // if(this.state.viewingQuestion) {
        //     view = <ViewQuestion/>
        // }
        return(
            <div>
                {!this.state.isLoading ? (
                <>
                    {view}
                </>
                ) : null}
            </div>
        )
    }
}

export default withStyles(componentStyles)(QuoraCont);