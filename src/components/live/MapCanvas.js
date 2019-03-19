import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { config } from '../../config/gmConfig';
import MapLive from './MapLive';

class MapCanvas extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m8" style={{height: '400px'}}>
            <MapLive initConfig={config} users={users} />
          </div>
          <div className="col s12 m3 offset-m1">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.firebase.ordered.users,
  }
}

export default compose(
  connect(mapStateToProps),
  firebaseConnect(['users'])
)(MapCanvas);
