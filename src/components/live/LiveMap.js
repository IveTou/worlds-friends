import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import classNames from 'classnames';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { setMaps } from '../../store/actions/mapsActions';

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
    }
  }
  
  initMap(comp, opt) {
    const maps = new googleMaps.Map(comp, {...opt});
    this.props.setMaps(maps);
  }

  componentDidMount() {
    this.initMap(document.getElementById('maps'), this.props.options);
  }

  componentDidUpdate({ markers: prevMarkers, directions: prevDirections }) {
    const { directions, distance, maps, markers, options } = this.props;

    if(!this.state.maps) {
      maps.setCenter(options.center);
    }

    map(prevMarkers, marker => marker.setMap(null)); 
    map(markers, marker => marker.setMap(maps));

    if(directions && (prevDirections !== directions)) {

      if(!this.state.maps) {
        directionsDisplay.setMap(maps);
        this.setState({ maps });
      }

      directionsDisplay.setDirections(this.props.directions);

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
    directions: state.maps.directions,
    distance: state.maps.distance,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMaps: maps => dispatch(setMaps(maps)),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LiveMap);


