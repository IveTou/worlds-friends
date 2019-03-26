import React, { Component } from 'react';
import { Menu, MenuItem, Zoom } from '@material-ui/core';

import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { reject } from 'lodash';

class SideBar extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
      anchorEl: null,
     }
   }

   handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }
  
  render () {
    const { anchorEl } = this.state;
    const { address, uid, profile, users } = this.props;
    const others = reject(users, ['key', uid]) || [];

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content" style={{fontSize: '12px'}}>
            <span className="card-title blue-text text-darken-4">About me</span>
            <ul className="summary">
              <li><span className="blue-text">Hello, I'm </span><span>{profile.firstName} {profile.lastName}</span></li>
              <li>
                <span className="blue-text">and I'm at </span>
                <span>{address ? address : 'Wait a second...'}</span>
              </li>
            </ul>
            <hr/>
            <span className="card-title green-text text-darken-4">World's friends</span>
            <ul className="summary">
              {others.length ? 
                others.map(other => {
                  let { key, value: { email, initials }} = other;
                  return(
                    <li key={key}>
                      <div 
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        style={{cursor: 'pointer'}}
                      >
                      <span className="green-text">{initials}</span>
                      <span> {email}</span>
                      </div>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        TransitionComponent={Zoom}
                      >
                        <MenuItem onClick={this.handleClose}>Details</MenuItem>
                        <MenuItem onClick={this.handleClose}>Go find!</MenuItem>
                      </Menu>
                    </li>
                  )}) :
                <span className="green-text">Alone at World... :'(</span>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firebase.ordered.users,
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    address: state.activity.address,
  }
}

export default compose(
  connect(mapStateToProps),
  firebaseConnect(['users']),
 )(SideBar);