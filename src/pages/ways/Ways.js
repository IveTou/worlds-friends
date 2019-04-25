import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filter, get } from 'lodash';
import { firebaseConnect } from 'react-redux-firebase';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LiveMap from '../../components/live/LiveMap';
import { config } from '../../config/maps';
import { getDirections, getDistance } from '../../store/actions/mapsActions';
import { 
  makeMarker,
  makePosition,
  isPointChanged,
  pointLegMatching,
  updateLeg,
} from '../../utils/maps-transformations';

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

const initialState = {
  origin: null, 
  destination: null, 
  offRoad: { distance: 0, index: 0, count: 0 },
}

class Ways extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }
  
  componentWillMount() {
    this.setState(makePosition({...this.props}), () => {
      const { origin, destination } = this.state;
      this.props.getDistance(origin, destination);
    });
  }

  componentDidMount() {
    const { origin, destination } = this.state;
    this.props.getDirections(origin, destination)
  }

  componentDidUpdate() {
    const { users, uid, directions, getDirections } = this.props;
    const { value: { address: origin } } = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];

    //Upadate every change
    if(isPointChanged(this.state.origin, origin) && directions) {
      const steps = get(directions, 'routes[0].legs[0].steps');
      const { index, distance } = pointLegMatching(origin, steps);
      const { offRoad: { count } } = this.state;

      this.setState({ 
        ...makePosition({...this.props}),
        offRoad: {
          index,
          distance,
          count: distance > 50 ? (count + 1) : count,
        }
      }, () => {
        const { offRoad: { index, count }, destination} = this.state;
        const { offRoad: initialOffRoad } = initialState;

        //More or equal than 3 expressive changes make us to update directions' legs or to calculate a new route
        if(count > 2) {
          console.log("You moved out of path. We are calculating other route for you...");
          getDirections(origin, destination);
          this.setState({ offRoad: initialOffRoad });
        } else {
          console.log("You moved massively, but we think you're in the same path...");
          const newLeg = updateLeg(get(directions, 'routes[0].legs[0]'), index);      
          directions.routes[0].legs[0] = newLeg;
        }
      });
    }
  }

  render() {
    const { classes, directions, uid, tuid } = this.props;
    const { origin, destination } = this.state;

    const options = { 
      center: {
        lat: (origin ? origin.latitude : -12.98),
        lng: (origin ? origin.longitude : -38.47),
      },
      zoom: 13,
    };
    
     /*
    TASK: Move creating Markers to live map
    */
    const originMarker = { marker: makeMarker(origin, true, config), id: uid };
    const destinationMarker = { marker:  makeMarker(destination, false, config), id: tuid };

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
