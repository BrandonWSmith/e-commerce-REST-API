const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/index');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()],
    (err, results) => {
      if (err) return done(err);

      if (results.rows.length > 0) {
        const user = results.rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          else {
            return done(null, false, { message: 'Incorrect Password.' });
          }
        });
      }
      else {
        return done(null, false, { message: 'Email Not Found.' });
      }
    });
  }
));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) return done(err);
    
    return done(null, results.rows[0]);
  });
});