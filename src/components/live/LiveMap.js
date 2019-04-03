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

export class LiveMap extends Component {

  initMap(comp, opt) {
    const maps = new window.google.maps.Map(comp, {...opt});
    this.props.setMaps(maps);
  }

  componentDidMount() {
    this.initMap(document.getElementById('maps'), this.props.options);
  }

  componentDidUpdate({ markers: prevMarkers}) {
    const { maps, markers, options } = this.props;

    maps.setCenter(options.center);

    map(prevMarkers, marker => marker.setMap(null)); 
    map(markers, marker => marker.setMap(maps));
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


