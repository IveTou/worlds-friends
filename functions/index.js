const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
// response.send("Hello bitcheees!");
//});

const createNotification = notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
}

minusOneHourTimestamp = () => {
  const currentTime = new Date();
  const passTime = currentTime.setMinutes(currentTime.getMinutes() - 30);
  return passTime;
}

/*
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: 'Addded a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    }

    return createNotification(notification);
  }
);
*/

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'Joined to the world',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp(),
        }

        return createNotification(notification);
      })
  }
)

//This function is scheduled by https://cron-job.org/en/members/jobs/details/?jobid=2660413
exports.removeInactive = functions.https.onRequest((req, res) => {
  admin.database().ref('users').orderByChild('timestamp')
  .endAt(minusOneHourTimestamp())
  .once('value', snapshot => {
    snapshot.forEach(snapshotChild => {
      snapshotChild.ref.remove()
      .then(() => console.log('The object', snapshotChild.child("email").val(),'was removed'))
      .catch(err => console.error('Remove failed: ', err.message))
    })
  });
  res.end();
});