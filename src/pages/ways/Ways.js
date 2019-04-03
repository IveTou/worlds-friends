import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { filter } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LiveMap from '../../components/live/LiveMap';

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

class Ways extends Component {
  render() {
    const { classes, tuid, uid, users } = this.props;

    const origin = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];
    const destination = filter(users, ({ key, value }) => ((key === tuid) || !value.address))[0] || [];

    const options = { 
      center: {
        lat: origin.value ? origin.value.address.latitude : -12.98,
        lng: origin.value ? origin.value.address.longitude : -38.47,
      },
      zoom: 13,
    };

    //TASK: Build Origin/Destination Markers

    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={12} sm={12}>
            <LiveMap 
              options={options}
              title="Road Map"
              roads
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tuid: state.maps.targetUserId,
    uid: state.firebase.auth.uid,
    users: state.firebase.ordered.users,
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Ways);
