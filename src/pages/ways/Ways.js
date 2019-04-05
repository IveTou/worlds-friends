import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filter } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LiveMap from '../../components/live/LiveMap';
import { config } from '../../config/maps';
import { getDirections } from '../../store/actions/mapsActions';

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

const makeMarker = ( 
  {value: { address: { latitude, longitude }}, key },
  own=true,
  config
) => {
  const position = new window.google.maps.LatLng(latitude, longitude);
  const icon = own 
        ? config.assetsUrl+config.ownMarker
        : config.assetsUrl+config.onlineMarker;

  return new window.google.maps.Marker({ position, icon })
}

class Ways extends Component {
  constructor(props) {
    super(props)
    const { tuid, uid, users } = props;
    const origin = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];
    const destination = filter(users, ({ key, value }) => ((key === tuid) || !value.address))[0] || [];
  
    this.state = {
       origin: origin,
       destination: destination,
    }
  }
  
  componentDidMount() {
    /* const so = [{
      location: { latitude: -12.34, longitude: -38.462 },
      stopover: true
    }]; */
    const { origin, destination } = this.state;
    this.props.getDirections(origin, destination);
  }

  render() {
    const { classes, directions } = this.props;
    const { origin, destination } = this.state;

    const options = { 
      center: {
        lat: (origin.value ? origin.value.address.latitude : -12.98),
        lng: (origin.value ? origin.value.address.longitude : -38.47),
      },
      zoom: 13,
    };

    const originMarker = makeMarker(origin, true, config);
    const destinationMarker = makeMarker(destination, false, config);

    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={12} sm={12}>
            <LiveMap 
              options={options}
              title="Road Map"
              roads
              markers={[originMarker, destinationMarker]}
              directions={directions}
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
    directions: state.maps.directions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDirections: (origin, destination, waypoints) => dispatch(getDirections(origin, destination, waypoints)),
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(['users']),
  connect(mapStateToProps, mapDispatchToProps),
)(Ways);
