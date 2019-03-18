**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

## Branches
the 'master' branch holds the basic project learned from The Net Ninja course called [React, Redux & Firebase App Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3) with some personal adjustment

The 'realtime-tracking' branch concerns tasks related to cloud functions and firebase realtime actions (WRITE, UPDATE, READ, DELETE)

## Scripts

### Create a React App from scratch

`create-react-app .` (in current path)

### Log In to Firebase through Firebase:CI

`npm install -g firebase-tools`
`firebase login`

### Install firebase

`npm i firebase`

### Deploy cloud functions

`firebase deploy --only functions`

### Deploy to Firebase Hosting

before to deploy to firebase we actually have to build our react app  
`npm run build`

...and deploy to firebase from the dist folder
`firebase deploy`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
