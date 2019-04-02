import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-redux-firebase-2f3ee.firebaseapp.com",
  databaseURL: "https://react-redux-firebase-2f3ee.firebaseio.com",
  projectId: "react-redux-firebase-2f3ee",
  storageBucket: "react-redux-firebase-2f3ee.appspot.com",
  messagingSenderId: "882986342728"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;