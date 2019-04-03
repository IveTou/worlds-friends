import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { reject, filter, pick } from 'lodash';

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
    const options = pick(config, ['center','zoom']);

    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={12} sm={3}>
            <Profile 
              address={null}
              firstName={firstName}
              lastName={lastName}
              uid={uid}
              users={others} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LiveMap 
              title="Map" 
              others={others}
              users={users}
              uid={uid}
              options={options}
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
    address: state.activity.address,
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