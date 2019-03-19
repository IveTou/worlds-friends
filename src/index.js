import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'; 
import fbConfig from './config/fbConfig';
import googleMapsClient from './config/gmConfig'

googleMapsClient.geocode({
  address: '529 14th St NW, Washington, DC 20045'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  } else {
    console.log(err);
  }
});

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(
      fbConfig, 
      {
        useFirestoreForProfile: true, 
        userProfile: 'users', 
        attachAuthIsReady: true
      }
    ),
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  serviceWorker.unregister();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA