export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make an async call to database
    const firestore = getFirestore();
    firestore.collection('projects').add({
      ...project,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorID: 1234,
      createAt: new Date()
    })
    .then(() => {
      dispatch({ type: 'CREATE_PROJECT', project })
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    });
  }
}