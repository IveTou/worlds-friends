import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  project: projectReducer
})