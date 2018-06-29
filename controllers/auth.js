const jwt = require('jwt-simple');
const config = require('./../config');
const firebase_db = require('../services/firebase');

exports.signIn = function(req, res, next) {

  console.log("Login Success");

  var timestamp = new Date().getTime();
  var payload = {
    sub: req.user.id,
    iat: timestamp
  };

  var token = jwt.encode(payload, config.secret);

  res.cookie('authorization', token, {expires : new Date(Date.now() + 1000*60*60*24*30)});

  //redirect back to client app
  res.redirect(config.client.url);
}

exports.isAuth = function(req, res, next) {
  // var authenticated = res.get('authorization');
  var token = req.cookies['authorization'];
  // console.log(token);

  //Decode the jwt token using method from jwt-simple module
  var payload = jwt.decode(token, config.secret);

  var user_id = payload.sub;

  var auth = {
    user: {},
    isAuth: false,
    token: ''
  };

  console.log("Verifying user is log in");

  firebase_db.collection('users').doc(user_id).get().then(function(doc) {
    //Retrieving user profile to be set on client app
    if(doc.exists)  {
      //Retrieving the data from the Firebase SnapShot object
      user = doc.data();

      auth.user.displayName = user.displayName;
      auth.user.avatar_url = user.avatar_url;
      auth.token = token;

      //Conditional field on the client authentication
      auth.isAuth = true;

      console.log(auth.user.displayName + ' is authenticated');
      res.send(auth);
    } else {
      console.log('Authentication failed because user can not be found in the database');
      res.send(auth);
    }
  }).catch(function(error) {
    auth.error = error;
    console.log('Authentication failed with error: ' + error);
    res.send(auth);
  });
}

exports.logout = function(req, res, next) {

  console.log("Logging out....");
  var token = req.cookies['authorization'];

  if(token) {
    var payload = jwt.decode(token, config.secret);

    var doc_id = payload.sub;

    firebase_db.collection('users').doc(doc_id).delete().then(function() {
      //Kill the cookie by setting the expire date to NOW
      res.cookie('authorization', token, {expires : new Date(Date.now())});
      res.send('A user have log out');
    }).catch(function(error) {
      res.send(error);
    });
  } else {
    res.send(false);
  }
  //
  // res.send('user already logout(no token in cookie)');
}
