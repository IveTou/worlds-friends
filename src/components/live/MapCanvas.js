import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Notifications from '../dashboard/Notifications';
import MapLive from './MapLive';

class MapCanvas extends Component {
  render() {
    const { users, notifications } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m8" style={{height: '400px'}}>
            <MapLive users={users} />
          </div>
          <div className="col s12 m3 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firebase.ordered.users,
    notifications: state.firestore.ordered.notifications,
  }
}

export default compose(
  connect(mapStateToProps),
  firebaseConnect(['users']),
  firestoreConnect([
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  ]) 
)(MapCanvas);
