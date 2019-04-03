import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { setMap } from '../../store/actions/mapActions';
import { config } from '../../config/maps';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  map: {
    height: theme.spacing.unit * 40,
  }
});

export class LiveMap extends Component {
  initMap(comp, opt){
    const map = new window.google.maps.Map(comp, {...opt});
    this.props.setMap(map);
  }

  componentDidMount() {
    this.initMap(document.getElementById('map'), this.props.options);
  }

  componentDidUpdate() {
    const { map, uid, users } = this.props;

    /* const userMarker = user 
      ? { 
          ...user.value.address, 
          icon: config.assetsUrl+config.ownMarker,
        } 
      : {};

    console.log(userMarker);

    new window.google.maps.Marker({ 
      position: { 
        lat: userMarker.latitude, 
        lng: userMarker.longitude, 
      },
      icon: userMarker.icon,
      map,
    }); */

  }

  render() {
    const { classes, title } = this.props;

    return (
      <Paper className={classes.paper}>
        <h5>{title}</h5>
        <hr/>
        <div className={classes.map} id='map'/>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    map: state.map.map,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMap: map => dispatch(setMap(map)),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LiveMap);


