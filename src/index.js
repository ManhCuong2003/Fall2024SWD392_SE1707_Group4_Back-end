const express = require('express');
const { connectDB } = require('./config/database.config');
const defaultErrorHandler = require('./middlewares/error.middlware');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieSession = require('cookie-session');
const session = require('express-session');

const app = express();

const mainRoute = require('./routes/index.routes');
const PORT = 3000;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));
connectDB();

app.use('/api', mainRoute);

// passport.use(new GoogleStrategy());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['3rdpartykey'],
//   })
// );
app.use(
  session({
    secret: '3rdpartykey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '84754317867-smglfre9ddr955hugrc8d8o6iubjhi3m.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { accessToken, profile, app_token: 'token' });
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('User authenticated:', req.user);
    res.redirect('/api/current_user');
  }
);

app.get('/api/current_user', (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  res.send({ user: req.user, app_token: req.user.app_token });
});

// // Facebook strategy configuration
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: 'YOUR_APP_ID',
//       clientSecret: 'YOUR_APP_SECRET',
//       callbackURL: '/auth/facebook/callback',
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Save user profile info to session or database
//       return done(null, profile);
//     }
//   )
// );

// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication
//     res.redirect('/profile');
//   }
// );

// default error handler
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
