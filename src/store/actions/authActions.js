export const signIn = credentials => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=> {
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      .then(res => {
        firebase.database().ref().child(res.user.uid).set({ 
          time: new Date().getTime(), 
          coordinates: { lng: null, lat: null }
        });
      })
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err })
      })
    })
  }
}

export const signOut = () => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS'});
    })
    .catch(err => {
      dispatch({ type: 'SIGNOUT_ERROR', err});
    });
  }
}

export const signUp = newUser => {
  return (dispatch, _, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password,
    )
    .then(res => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
      })
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS'});
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    })
  }
}