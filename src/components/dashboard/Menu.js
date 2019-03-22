import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Menu = ({ address, auth, profile, users }) => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content" style={{fontSize: '12px'}}>
          <span className="card-title blue-text text-darken-4">About me</span>
          <ul className="summary">
            <li><span className="blue-text">Hello, I'm </span><span>{profile.firstName} {profile.lastName}</span></li>
            <li>
              <span className="blue-text">and I'm at </span>
              <span>{address ? address : 'Wait a second...'}</span>
            </li>
          </ul>
          <hr/>
          <span className="card-title green-text text-darken-4">About the world</span>
          <ul className="summary">
            <li>Who am I?</li>
            <li>Where am I?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.firebase.ordered.users,
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    address: state.activity.address,
  }
}

export default compose(
  connect(mapStateToProps),
  firebaseConnect(['users']),
 )(Menu);