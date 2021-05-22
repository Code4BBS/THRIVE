import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <h2 style={{ textAlign: "center" }}>{props.title}</h2>

        <DialogContentText id="alert-dialog-slide-description">
          <i>{props.description}</i>
        </DialogContentText>

        <b>Pre Requisite: &nbsp;</b>
        <br />
        {props.preRequisite ? props.preRequisite : "No Pre Requisite"}
        <br />
        <br />
        <b>Contact: &nbsp;</b>
        <br />
        {props.communication}
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
