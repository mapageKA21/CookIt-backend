'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const passport = require('koa-passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');

const config = require('./config.json');
const router = require('./router.js');
const db = require('./models');
const User = require('./models').models.User;

const app = koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

// passport.serializeUser(function(user, done) {
//   done(null, user._id)
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, done);
// });

passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compareSync(password,user.hash)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

const hostname = config.hostname;
const port = config.port;

db.connection.on('error', console.error.bind(console, 'connection error on db:'));
db.connection.once('open', function() {
  app.listen(config.port, function () {
    console.log('Server listening on port ' + config.port);
  });
});
