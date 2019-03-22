import React from 'react';
import { compose, withProps } from "recompose";
import { connect } from 'react-redux'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import { config } from '../../config/gmConfig';

const labelStyle = {
  fontSize: "12px", 
  paddingBoottom: "4px", 
  color: '#3d3d3d',
  fontWeight: 500,
}

const MapLive = ({ users, uid }) => 
  <GoogleMap 
    defaultZoom={config.zoom} 
    defaultCenter={
      { 
        lat: config.center.lat, 
        lng: config.center.lng,
      }
    }>
    {users && users.map(user => {
      const { value: { coordinates }} = user;
      return coordinates && <MarkerWithLabel
        clickable={uid !== user.key} 
        position={{ 
          lat: coordinates.latitude, 
          lng: coordinates.longitude,
        }} 
        key={user.key}
        labelAnchor={{x: 10, y: 44}}
        icon={uid === user.key
          ? config.assetsUrl+config.ownMarker
          : config.assetsUrl+config.onlineMarker
        }
        >
          <label style={labelStyle}>{uid === user.key && 'Me'}</label>
        </MarkerWithLabel>
      }
    )}
  </GoogleMap>

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
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
  connect(mapStateToProps),
)(MapLive);