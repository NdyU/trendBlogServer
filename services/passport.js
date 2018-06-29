const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const firebase_db = require('./firebase');

const jwt = require('jwt-simple');

passport.use(new GoogleStrategy({
    clientID: "310052927146-86lrm9vp0afr0e4330dkdsn1evqdqrvu.apps.googleusercontent.com",
    clientSecret: "gLlFnyG15E6g5aClxtuGqplv",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    console.log("Logging In....");

    var data = profile._json;

    const user = {
      id: data.id,
      displayName: data.displayName,
      avatar_url: data.image.url,
      last_login: new Date(Date.now())
    };

    //Merge the old user data with the new user data if user already exist in our database
    firebase_db.collection('users').doc(user.id).set(user, {merge: true}).then(function() {
      return done(null, user);
    }).catch(function(err) {
      console.error("Error adding document: ", error);
      return(null, false);
    });
  }
));

passport.serializeUser(function(user, done) {

  //Serialize the user with user's id
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  //Deserialize the user by retrieving the user from database using the user's id
  firebase_db.collection("users").doc(id).get().then(function(doc) {
    if(doc.exists) {
      var user = doc.data();

      done(null, user);
    } else {
      console.log("Error deserializing user during login because user is not found in database");
      done(null, false);
    }
  }).catch(function(error) {
    console.log("Error deserializing user during login: " + error);
    done(null, false);
  });
});
