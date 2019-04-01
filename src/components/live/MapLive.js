import React from 'react';
import { compose, withProps } from "recompose";
import { connect } from 'react-redux'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import { setMap } from '../../store/actions/mapActions';
import { config } from '../../config/gmConfig';

const labelStyle = {
  fontSize: "12px", 
  paddingBoottom: "4px", 
  color: '#3d3d3d',
  fontWeight: 500,
}

const MapLive = ({ users, uid, directions, setMap }) => {
  if(directions  && directions.routes[0].legs.length) { 
    directions.routes[0].legs[0].steps.pop();
  }

  return (
  <GoogleMap
    ref={map => setMap(map)}
    defaultZoom={config.zoom} 
    defaultCenter={
      { 
        lat: config.center.lat, 
        lng: config.center.lng,
      }
    }
  >
    {users && users.map(user => {
      const address = user.value.address || null;
      if(address) {
        const { coordinates: { latitude, longitude }} = address;
        return (
          <MarkerWithLabel
            clickable={uid !== user.key} 
            position={{ 
              lat: latitude, 
              lng: longitude,
            }} 
            key={user.key}
            labelAnchor={{x: 8, y: 44}}
            icon={uid === user.key
              ? config.assetsUrl+config.ownMarker
              : config.assetsUrl+config.onlineMarker
            }
            >
              <label style={labelStyle}>{uid === user.key && 'Me'}</label>
          </MarkerWithLabel>
        )
      }

      return null;
    })}
    {directions && 
      <DirectionsRenderer 
        options = {{ suppressMarkers: true }} 
        directions = {directions} 
      />
    }
  </GoogleMap>
  )}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMap: map => dispatch(setMap(map)),
  }
}

export default compose(
  withProps({
    googleMapURL: `${config.url}key=${config.key}&v=${config.v}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  connect(mapStateToProps, mapDispatchToProps),
)(MapLive);