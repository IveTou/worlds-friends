import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyBWVHBd8PAc2lDxwKynruK2f4Umv-QF8LQ",
  authDomain: "react-redux-firebase-2f3ee.firebaseapp.com",
  databaseURL: "https://react-redux-firebase-2f3ee.firebaseio.com",
  projectId: "react-redux-firebase-2f3ee",
  storageBucket: "react-redux-firebase-2f3ee.appspot.com",
  messagingSenderId: "882986342728"
};

firebase.initializeApp(config);

export default firebase;