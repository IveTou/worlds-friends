import authReducer from './authReducer';
import projectReducer from './projectReducer';
import activityReducer from './activityReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  activity: activityReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})