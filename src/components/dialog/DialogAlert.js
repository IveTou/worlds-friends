import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Slide 
} from '@material-ui/core';

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

const DialogAlert = ({ 
  open, 
  title, 
  message, 
  hasProgress, 
  countDown, 
  agree, 
  disagree, 
}) => {
  
  return (
    <Dialog
      open={this.state.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {disagree && 
          <Button onClick={this.handleClose} color="primary">
            {disagree}
          </Button>
        }
        {agree && 
          <Button onClick={this.handleClose} color="primary">
            {agree}
          </Button>
        }  
      </DialogActions>
    </Dialog>
  )
}

DialogAlert.propTypes = {
  agree: PropTypes.string,
  disagree: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default DialogActions;
