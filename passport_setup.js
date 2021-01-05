var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "189166112945-lq2lim52phonqrnobeafh49c960uuh6i.apps.googleusercontent.com",
      clientSecret: "-rjP9dQSIS1WHmNPBE4WZZw2",
      callbackURL: "http://localhost:3002/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
