import React, { Component } from 'react';
import { Menu, MenuItem, Zoom } from '@material-ui/core';

import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { filter, reject } from 'lodash';

import { getRoute } from '../../store/actions/activityActions';

class SideBar extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget, selectedId: null });
  }

  handleClose = () => {
    this.setState({ anchorEl: null, selectedId: null  });
  };

  handleClickDetails = e => {
    this.setState({ anchorEl: null, selectedId: e.target.id });
  }

  handleClickFind = e => {
    const { users, address: { coordinates: origin } } = this.props;
    const { id: targetId } = e.target;
    const { value: { coordinates: target } } = filter(users, ['key', targetId])[0] || {};

    this.setState({ anchorEl: null, targetId });
    this.props.getRoute(origin, target)
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
                <span>{address ? address.formatted : 'Wait a second...'}</span>
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
                        <span className="green-text">{initials} </span>
                        <span>{email}</span>
                      </div>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        TransitionComponent={Zoom}
                      >
                        <MenuItem 
                          id={key}
                          onClick={this.handleClickDetails}
                          style={{ minWidth: '140px'}}
                        >
                          Details
                        </MenuItem>
                        <MenuItem 
                          id={key}
                          onClick={this.handleClickFind}
                          style={{ minWidth: '140px'}}
                          disabled={!address}
                        >
                          {address ? 'Go find!' : 'Please wait a little...'}
                        </MenuItem>
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
    route: state.activity.route,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoute: (origin, target) => dispatch(getRoute(origin, target))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(['users']),
 )(SideBar);