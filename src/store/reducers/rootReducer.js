import authReducer from './authReducer';
import activityReducer from './activityReducer';
import dialogReducer from './dialogReducer';
import mapReducer from './mapReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducer,
  activity: activityReducer,
  map: mapReducer,
  dialog: dialogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})