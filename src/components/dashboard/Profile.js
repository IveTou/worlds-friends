import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Paper, Menu, MenuItem, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { setTargetUserId } from '../../store/actions/mapsActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  primary : {
    color: 'darkblue',
  },
  name :{
    color: 'green',
  },
  menuItem: {
    minWidth: theme.spacing.unit * 18,
  },
});

const renderList = (classes, users = []) => {
  return users.length ?
    <ul>
      {users && users.map(user => {
        let { key, value: { initials, firstName, lastName }} = user;
        return(
          <li key={key}>
            <div 
              aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              style={{cursor: 'pointer'}}
            >
              <span className={classes.name}>
                > {firstName} {lastName} 
              </span>
              <span> ( {initials} )</span>
            </div>
            <Menu
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              TransitionComponent={Zoom}
            >
              <MenuItem 
                id={key}
                onClick={this.handleClickDetails}
                className={classes.menuItem}
              >
                Details
              </MenuItem>
              <MenuItem 
                id={key}
                onClick={this.handleClickFind}
                className={classes.menuItem}
              >
                Go find!
              </MenuItem>
            </Menu>
          </li>
        )
      })}
    </ul> :
    'Looking for someone else...';
}

class Profile extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
      anchorEl: null,
      address: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickDetails = e => {
    this.setState({ anchorEl: null });
  }

  handleClickFind = e => {
    this.props.history.push('/finding-ways');
    this.props.setTargetUserId(e.target.id);
  }
  
  render() {
    const { address, classes, firstName, lastName, users } = this.props;
    return (
      <Paper className={classes.paper}>
        <h5>Profile</h5>
        <hr/>
        <ul>
          <li className={classes.primary}>{firstName} {lastName}</li>
          <li><span>{address || 'Wait a second...'}</span></li>
        </ul>
        <h6>People</h6>
        <hr/>
        { renderList(classes, users) }
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTargetUserId: tuid => dispatch(setTargetUserId(tuid)),
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps),
)(Profile);
