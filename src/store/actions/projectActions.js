export const createProject = project => {
  return (dispatch, getState, { _, getFirestore }) => {
    //make an async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorID: authorId,
      createdAt: new Date(),
    })
    .then(() => {
      dispatch({ type: 'CREATE_PROJECT', project })
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    });
  }
}