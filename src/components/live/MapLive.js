import React from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core/styles';
import className from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const Pin = ({ content, id, classes }) => 
  <div id={`user-${id}`}>
    <Avatar 
      className={className(classes.avatar, classes.orangeAvatar)}
    >
      {content}
    </Avatar>
  </div>;

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
};

const MapLive = ({ classes, initConfig, users = [] }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: initConfig.key }}
      defaultCenter={initConfig.center}
      defaultZoom={initConfig.zoom}
    >
      {users && users.map(user => 
        <Pin 
          id={user.key}
          key={user.key}
          content={user.value.initials}
          classes={classes}
          lat={user.value.coordinates && user.value.coordinates.latitude}
          lng={user.value.coordinates && user.value.coordinates.longitude}
        />
      )}
    </GoogleMapReact>
  )
}

export default withStyles(styles)(MapLive);
