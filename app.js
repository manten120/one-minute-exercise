const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
/* Twitter認証 */
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-twitter');

let config;
if (!process.env.HEROKU_URL) {
  // eslint-disable-next-line global-require
  config = require('./config');
}
/* Twitter認証 ここまで */

const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

/* Twitter認証 */
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY || config.twitter.consumerKey,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET || config.twitter.consumerSecret,
      callbackURL: process.env.HEROKU_URL ? `${process.env.HEROKU_URL}oauth_callback` : config.twitter.callbackURL,
    },
    (token, tokenSecret, profile, cb) => {
      process.nextTick(() => cb(null, profile));
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
/* Twitter認証 ここまで */

const app = express();
app.use(helmet());

// Twitterのアイコン画像を使用するためhttps://pbs.twimg.comを許可
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'data:', 'https://pbs.twimg.com'],
    },
  })
);

console.log(helmet.contentSecurityPolicy.getDefaultDirectives());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Twitter認証 */
app.use(session({ secret: '417cce55dcfcfaeb', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
/* Twitter認証 ここまで */

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

/* Twitter認証 */
app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/oauth_callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.clearCookie('mdOneMinEx');
  res.redirect('/main');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('mdOneMinEx');
  res.redirect('/');
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/');
// }
/* Twitter認証 ここまで */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
