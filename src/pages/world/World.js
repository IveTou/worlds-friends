import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { reject, filter, map } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Notifications from '../../components/dashboard/Notifications';
import Profile from '../../components/dashboard/Profile';
import LiveMap from '../../components/live/LiveMap';

import { config } from '../../config/maps';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: theme.spacing.unit * 128,
    margin: '0 auto',
  },
  grid: {
    width: 'auto',
    margin: 0,
  }
});

class World extends Component {
  render() {
    const { 
      classes, 
      notifications, 
      profile: { firstName, lastName},
      uid,
      users,
    } = this.props;

    const others = reject(users, ({ key, value }) => ((key === uid) || !value.address)) || [];
    const user = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];
    const options = { 
      center: {
        lat: user.value ? user.value.address.latitude : -12.98,
        lng: user.value ? user.value.address.longitude : -38.47,
      },
      zoom: 13,
    };
    
    const markers = map(users, user => {
      const { value: { address: { latitude, longitude }}, key } = user;
      const position = new window.google.maps.LatLng(latitude, longitude);
      const icon = key === uid 
        ? config.assetsUrl+config.ownMarker
        : config.assetsUrl+config.onlineMarker;

      return new window.google.maps.Marker({ position, icon })
    });

    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            <Profile 
              address={null}
              firstName={firstName}
              lastName={lastName}
              users={others} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LiveMap 
              markers={markers}
              options={options} 
              title="Map"
              users={users}              
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Notifications notifications={notifications}/>
          </Grid>
        </Grid>
      </div>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firebaseConnect(['users']),
  firestoreConnect([
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  ]) 
)(World);