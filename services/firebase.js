const firebase = require('firebase');

require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyAHVe8i9Pa4tnch-TPIdLNE9ZtfC2qY2a8',
  authDomain: 'chatio-206515.firebaseapp.com',
  projectId: 'chatio-206515'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

module.exports = db;
