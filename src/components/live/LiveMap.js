import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { 
  each, 
  find, 
  get,
  map,
  intersectionBy,
  differenceBy,
  union
} from 'lodash';
import classNames from 'classnames';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { setMaps, eraseMarkers, setMarkers } from '../../store/actions/mapsActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  maps: {
    height: theme.spacing.unit * 40,
  },
  roads: {
    height: theme.spacing.unit * 60,
  }
});

const googleMaps = window.google.maps;
const directionsDisplay = new googleMaps.DirectionsRenderer({suppressMarkers: true});

export class LiveMap extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      maps: null,
      stepsCount: Infinity,
    }
  }
  
  initMap(comp, opt) {
    const maps = new googleMaps.Map(comp, {...opt});
    this.props.setMaps(maps);
  }

  componentDidMount() {
    this.initMap(document.getElementById('maps'), this.props.options);
    this.props.eraseMarkers();
  }

  componentDidUpdate({ markers: prevMarkers }) {
    const { 
      directions, 
      distance, 
      maps, 
      stagedMarkers, 
      markers, 
      options, 
      setMarkers, 
    } = this.props;

    if(!this.state.maps) {
      maps.setCenter(options.center);
    }
   
    const markersToAdd = differenceBy(markers, stagedMarkers, 'id');
    const markersDiff = differenceBy(prevMarkers, markers, 'id');
    const markersIntersec = intersectionBy(stagedMarkers, markersDiff, 'id');
    const markersToUpdate = intersectionBy(stagedMarkers, markers, 'id');

    each(markersToUpdate, ({ marker, id }) => {
      const { marker: input } = find(markers, ['id', id]);
      const inputPosition = input.getPosition();
      const currentPosition = marker.getPosition();

      if(inputPosition !== currentPosition) {
        marker.setPosition(inputPosition);
      }
    });

    map(markersToAdd, ({ marker }) => marker.setMap(maps));
    map(markersIntersec, ({ marker }) => marker.setMap(null));

    if(markersToAdd.length || markersIntersec.length) {
      const mUnion = union(stagedMarkers, markersToAdd);
      const uDiff =  differenceBy(mUnion, markersIntersec, 'id');
      setMarkers(uDiff);
    }

    //Treats directions changes
    if(directions) {
      const steps = get(directions, 'routes[0].legs[0].steps');
      const stepsCount = this.state.stepsCount;

      if(!this.state.maps) {
        directionsDisplay.setMap(maps);
        this.setState({ maps });
      }

      if(steps.length < stepsCount) {
        this.setState({ stepsCount: steps.length }, () => {
          console.log("Steps have changed", this.state.stepsCount);
        });

        //That prevents restore zoom by set directions every interaction
        directionsDisplay.setDirections(this.props.directions);
      }

      //Evertime directions was changed and distance is more than 50m we set the new direction//DON'T CHANGE
      if(distance && distance.value > 50) {
        console.log('Too far yet! You are in', distance.text);
      } else {
        console.log('Probable he is here!', distance && `You are in ${distance.text}`);
      }
    }
  }

  render() {
    const { classes, title, roads } = this.props;

    return (
      <Paper className={classes.paper}>
        <h5>{title}</h5>
        <hr/>
        <div 
          className={classNames(classes.maps, roads && classes.roads)}
          id='maps'
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    maps: state.maps.maps,
    stagedMarkers: state.maps.stagedMarkers,
    directions: state.maps.directions,
    distance: state.maps.distance,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMaps: maps => dispatch(setMaps(maps)),
    setMarkers: markers => dispatch(setMarkers(markers)),
    eraseMarkers: () => dispatch(eraseMarkers()),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LiveMap);


