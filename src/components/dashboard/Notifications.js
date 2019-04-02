import React from 'react';
import moment from 'moment';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  primary : {
    color: 'green',
  },
  other: {
    color: 'grey',
    fontSize: '10px',
  },
});

const Notifications = ({ classes, notifications }) => {
  return (
    <Paper className={classes.paper}>
      <h5>Notifications</h5>
      <hr/>
      <ul>
        {notifications && notifications.map(item => 
          <li key={item.id}>
            <span className={classes.primary}>{item.user} </span>
            <span>{item.content}</span>
            <div className={classes.other}>
              {moment(item.time.toDate()).fromNow()}
            </div>
          </li>
        )}
      </ul>
    </Paper>
  )
}

export default withStyles(styles)(Notifications);