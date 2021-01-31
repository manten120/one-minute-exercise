const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
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
const loginRouter = require('./routes/login');
const oauthCallbackRouter = require('./routes/oauthCallback');

/* Twitter認証 */
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY || config.twitter.consumerKey,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET || config.twitter.consumerSecret,
      callbackURL: process.env.HEROKU_URL ? `${process.env.HEROKU_URL}/oauth_callback` : config.twitter.callbackURL,
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
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// Twitterのアイコン画像を使用するためhttps://pbs.twimg.comを許可
// Twitterのシェアボタンのためhttps://platform.twitter.com,https://syndication.twitter.comを許可
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'default-src': ["'self'", 'https://platform.twitter.com'],
      'script-src': ["'self'", 'https://platform.twitter.com'],
      'img-src': ["'self'", 'data:', 'https://pbs.twimg.com', 'https://syndication.twitter.com'],
    },
  })
);

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
app.use('/login', loginRouter);
/* Twitter認証 */
app.use('/oauth_callback', passport.authenticate('twitter', { failureRedirect: '/' }), oauthCallbackRouter);
app.get('/login/twitter', passport.authenticate('twitter'));
/* Twitter認証 ここまで */

app.get('/logout', (req, res) => {
  res.clearCookie('mdOneMinEx');
  // Twitter認証からログアウト
  req.logout();
  res.redirect('/');
});

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
