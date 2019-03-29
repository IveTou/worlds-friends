import React, { Component } from 'react';
import { Menu, MenuItem, Zoom } from '@material-ui/core';

import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { filter, isEmpty, reject, round, transform } from 'lodash';

import { getDetailedInfo } from '../../store/actions/activityActions';
import { getRoute } from '../../store/actions/mapActions';

class SideBar extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
      anchorEl: null,
      targetUserId: null,
      address: null,
    }
  }

  componentDidUpdate() {
    const { address: addressProps } = this.props;
    const { address: addressState } = this.state;

    const coordinatesProps = !isEmpty(addressProps) ?
      transform(addressProps.coordinates, (res, val, key) => {
        res[key] = round(val, 3)
      }) :
      {};

    const coordinatesState = !isEmpty(addressState) ?
      transform(addressState.coordinates, (res, val, key) => {
        res[key] = round(val, 3)
      }) :
      {};
    
    if(isEmpty(addressState) && !isEmpty(addressProps)) {
      this.setState({ address: addressProps }, () => this.props.getDetailedInfo());
    } else if (
      !isEmpty(addressState) && 
      !isEmpty(addressProps) && 
      (JSON.stringify(coordinatesState) !== JSON.stringify(coordinatesProps))
    ) {
      this.setState({ address: addressProps }, () => this.props.getDetailedInfo());
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget, targetUserId: null });
  }

  handleClose = () => {
    this.setState({ anchorEl: null, targetUserId: null  });
  };

  handleClickDetails = e => {
    this.setState({ anchorEl: null, targetUserId: e.target.id });
  }

  handleClickFind = e => {
    const { users, address: { coordinates, placeId }} = this.props;
    const { id: targetUserId } = e.target;
    const { value: { address: {coordinates: destination }}} = filter(users, ['key', targetUserId])[0] || {};
    const origin = { ...coordinates, placeId };

    this.setState({ anchorEl: null, targetUserId });

    this.props.getRoute(origin, destination);
  }
  
  render () {
    const { anchorEl } = this.state;
    const { address, uid, profile, users } = this.props;
    const others = reject(users, ['key', uid]) || [];
    const { formatted } = address || {};

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content" style={{fontSize: '12px'}}>
            <span className="card-title blue-text text-darken-4">About me</span>
            <ul className="summary">
              <li><span className="blue-text">Hello, I'm </span><span>{profile.firstName} {profile.lastName}</span></li>
              <li>
                <span className="blue-text">and I'm at </span>
                <span>{formatted || 'Wait a second...'}</span>
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
                  )
                }) :
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
    getRoute: (origin, destination) => dispatch(getRoute(origin, destination)),
    getDetailedInfo: () => dispatch(getDetailedInfo()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(['users']),
 )(SideBar);