import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { reject, filter, get, map } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Notifications from '../../components/dashboard/Notifications';
import Profile from '../../components/dashboard/Profile';
import LiveMap from '../../components/live/LiveMap';

import { eraseDirections } from '../../store/actions/mapsActions';
import { makeMarker } from '../../utils/maps-transformations';

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
  componentDidMount() {
    this.props.eraseDirections();
  }

  render() {
    const { 
      classes, 
      notifications, 
      profile: { firstName, lastName},
      uid,
      users,
    } = this.props;

    const others = reject(users, ({ key, value }) => ((key === uid) || !value.address)) || null;
    const user = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || null;
    const options = { 
      center: {
        lat: (user ? get(user, 'value.address.latitude') : -12.98),
        lng: (user ? get(user, 'value.address.longitude') : -38.47),
      },
      zoom: 13,
    };
    
    /*
    TASK: Avoid to create without be sure that will be added to map; 
    Sugestion: make Markers in the live map
    */
    const markers = map(users, user => {
      const { value: { address: { latitude = null, longitude = null } = {}} = {}, key } = user;
      const marker = makeMarker({ latitude, longitude }, key === uid, config, 2);
      return { marker: marker, id: key };
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

const mapDispatchToProps = dispatch => {
  return {
    eraseDirections: () => dispatch(eraseDirections()),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(['users']),
  firestoreConnect([
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  ]) 
)(World);