export const signIn = credentials => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=> {
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err })
      });
    })
    .catch(err => console.log(err.message));
  }
}

export const signOut = () => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCESS'});
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
      dispatch({ type: 'SIGNUP_SUCESS'});
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    })
  }
}