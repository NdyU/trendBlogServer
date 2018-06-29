const passport = require('passport');
const session = require('express-session');
const config = require('./config');

const auth = require('./controllers/auth');

//Use defined stragies
require('./services/passport');

//Passport middleware settings, for authentication
const requireAuth = passport.authenticate('google', {
  failureRedirect: '/',
  session: true});

module.exports = function(app) {

  //Using session
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
  }));

  //Additional passport configs
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', function(req, res, next) {
    res.send('Welcome');
  });


  app.get('/login', auth.login);
  app.get('/logout', auth.logout);

  //Google oauth entry point
  app.get('/auth/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
  //Google oauth callback route
  app.get('/auth/google/callback',
    requireAuth,
    auth.googleAuthCallback
  );

  app.get('/isAuth', auth.isAuth);

}
