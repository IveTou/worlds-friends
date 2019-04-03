import React, { Component } from 'react';

import LiveMap from '../../components/live/LiveMap';

class Ways extends Component {
  render() {
    return (
      <LiveMap 
    
        title="Road Map"
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    users: state.firebase.ordered.users,
    notifications: state.firestore.ordered.notifications,
  }
}

export default Ways;
