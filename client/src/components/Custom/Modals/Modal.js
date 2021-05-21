import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
// import EmailIcon from '@material-ui/icons/Email';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  let communication = null;

  if (props.communication.other) {
    communication = props.communication.other;
  } else if (props.communication.whatsapp) {
    communication = (
      <span>
        <WhatsAppIcon
          style={{
            marginRight: "0.5rem",
            height: "1.5rem",
            width: "1.5rem",
          }}
        />
        <a
          href={`https://wa.me/${props.communication.whatsapp}/?text=urlencodedtext`}
          style={{ textDecoration: "none" }}
        >
          {props.communication.whatsapp}
        </a>
      </span>
    );
  } else if (props.communication.linkedIn) {
    communication = (
      <span>
        <LinkedInIcon
          style={{
            marginRight: "0.5rem",
            height: "1.5rem",
            width: "1.5rem",
            marginTop: "0.5rem",
          }}
        />
        <a
          href={props.communication.linkedIn}
          style={{ textDecoration: "none" }}
        >
          {props.communication.linkedIn}
        </a>
      </span>
    );
  }

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
        <b>Contact: &nbsp;</b>
        <br />
        {communication}
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
