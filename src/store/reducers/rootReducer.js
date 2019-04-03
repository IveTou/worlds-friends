import authReducer from './authReducer';
import activityReducer from './activityReducer';
import dialogReducer from './dialogReducer';
import mapsReducer from './mapsReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducer,
  activity: activityReducer,
  maps: mapsReducer,
  dialog: dialogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})