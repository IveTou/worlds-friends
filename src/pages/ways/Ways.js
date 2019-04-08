import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filter, isEmpty, map, round, transform } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LiveMap from '../../components/live/LiveMap';
import { config } from '../../config/maps';
import { getDirections } from '../../store/actions/mapsActions';

export const styles = theme => ({
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

const googleMaps = window.google.maps;

export const makeMarker = ({ latitude, longitude }, own=true, config ) => {
  const position = new googleMaps.LatLng(latitude, longitude);
  const icon = own 
        ? config.assetsUrl+config.ownMarker
        : config.assetsUrl+config.onlineMarker;

  return new googleMaps.Marker({ position, icon })
}

export const makePosition = ({tuid, uid, users}) => {
  const origin = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];
  const destination = filter(users, ({ key, value }) => ((key === tuid) || !value.address))[0] || [];
  return { origin: origin.value.address, destination: destination.value.address }
}

export const arePointsChanged = (prev, current) => {
  const response = [];

  const prevUsersAddress = map(prev, prevUser => {
    const { address } = prevUser.value;
    return transform(address, (res, val, key) => {
        res[key] = round(val, 3)
    })
  });

  const usersAddress = map(current, prevUser => {
    const { address } = prevUser.value;
    return transform(address, (res, val, key) => {
        res[key] = round(val, 3)
    })
  });

  for(let i in prevUsersAddress) {
    response.push(
      prevUsersAddress[i].latitude !== usersAddress[i].latitude ||
      prevUsersAddress[i].longitude !== usersAddress[i].longitude
    )
  }

  return response.indexOf(true) > 0;
}

export const isPointChanged = (prev, current) => {
  const response =
    round(prev.latitude, 3) !==  round(current.latitude, 3) ||
    round(prev.longitude, 3) !==  round(current.longitude, 3);
  return response;
}


class Ways extends Component {
  constructor(props) {
    super(props)
    this.state = { origin: null, destination: null, pointsChanges: 0 };
  }
  
  componentWillMount() {
    /* const so = [{
      location: { latitude: -12.34, longitude: -38.462 },
      stopover: true
    }]; */
    //console.log('makeposition',makePosition({...this.props}));
    this.setState(makePosition({...this.props}), () => {
      const { origin, destination } = this.state;
      this.props.getDirections(origin, destination);
    });
    
  }

  componentDidUpdate() {
    const { users, uid } = this.props;
    const { value: { address: origin } } = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];

    if(isPointChanged(this.state.origin, origin)) {
      this.setState(makePosition({...this.props}));
      this.setState({ pointsChanges: this.state.pointsChanges + 1 }, () => { 
        console.log('your point has changed ', this.state.pointsChanges, ' times')
      })
    }
  }

  render() {
    const { classes, directions } = this.props;
    const { origin, destination } = this.state;

    const options = { 
      center: {
        lat: (origin ? origin.latitude : -12.98),
        lng: (origin ? origin.longitude : -38.47),
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
