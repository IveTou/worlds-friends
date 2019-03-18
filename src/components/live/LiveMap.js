import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class LiveMap extends Component {
  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
          {JSON.stringify(users, null, 2)}
          </div>
          <div className="col s12 m5 offset-m1">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.firebase.ordered.users,
  }
}

export default compose(
  connect(mapStateToProps),
  firebaseConnect(['users'])
)(LiveMap);
