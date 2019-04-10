import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filter } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LiveMap from '../../components/live/LiveMap';
import { config } from '../../config/maps';
import { getDirections, getDistance } from '../../store/actions/mapsActions';
import { makeMarker, makePosition, arePointsChanged, isPointChanged} from '../../utils/maps-transformations';

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

    this.setState(makePosition({...this.props}), () => {
      const { origin, destination } = this.state;
      this.props.getDistance(origin, destination);
    });
  }

  componentDidMount() {
    const { origin, destination } = this.state;
    this.props.getDirections(origin, destination)
  }

  componentDidUpdate({users: prevUsers}) {
    const { users, uid, directions } = this.props;
    const { value: { address: origin } } = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];

    if(isPointChanged(this.state.origin, origin)) {//Upadate every change
      this.setState(makePosition({...this.props}));
      this.setState({ pointsChanges: this.state.pointsChanges + 1 }, () => {
        //Just to update own status
        console.log('your point has changed ', this.state.pointsChanges, ' times');
      });
    }

    if(isPointChanged(this.state.origin, origin,3)) {//Expressive changes
      console.log('You moved massively!!');
      directions.routes[0].legs[0].steps.shift();
    }

    
    if(arePointsChanged(prevUsers, users)) {
      const points = makePosition({...this.props})
      this.props.getDistance(points.origin, points.destination);
      console.log('some or both of points have changed');
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
    getDistance: (origin, distance, func) => dispatch(getDistance(origin, distance, func)),
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(['users']),
  connect(mapStateToProps, mapDispatchToProps),
)(Ways);
