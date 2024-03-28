const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const db = require('./db/index');
const users = require('./routes/users');
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log(email, password);
    db.query('SELECT * FROM users WHERE email = $1', [email],
    (err, results) => {
      if (err) return done(err);

      console.log(results.rows);

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
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], function (err, results) {
    if (err) return done(err);
    console.log(`ID id ${results.rows[0].id}`);

    done(null, results.rows[0]);
  });
});

app.use(
  session({
    secret: 'Password1',
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: 'none' },
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.send('Welcome to the eShopping Homepage');
});

app.get('/login', (req, res) => {
  console.log(req.session.flash);
  res.render('login');
});

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }
));

app.get('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next (err);
    res.redirect('/');
  });
});

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUsersById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
app.get('/products', products.getProducts);
app.get('/products/:id', products.getProductById);
app.post('/products', products.createProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});