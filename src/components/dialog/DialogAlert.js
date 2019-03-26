import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Button, 
  CircularProgress, 
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

class DialogAlert extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open: props.open,
       countDown: props.countDown,
    }
  }

  componentDidMount() {
    //Starts countDown when component has been created with counter
  }
  
  componentDidUpdate(prevProps) {
    //Starts countDown after a component has been created without counter
    if (this.props.countDown !== prevProps.countDown) {
      this.fetchData(this.props.userID);
    }
  }

  render(){
    const {   
      title, 
      message, 
      hasProgress, 
      agree, 
      disagree, 
    } = this.props;
  
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
          {hasProgress && <CircularProgress />}
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
    );
  }
}

export default DialogAlert;
