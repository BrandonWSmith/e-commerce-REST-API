const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./routes/users');
const products = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
app.get('/', (req, res) => {
  res.send('Welcome to the eShopping Homepage');
});

passport.use(new LocalStrategy(
  function verify(email, password, done) {
    users.get('SELECT * FROM users WHERE email = ?', [email], async function(err, user) {
      if (err) return done(err);

      if (!user) return done(null, false, { message: 'Incorrect email or password.' });

      const matchedPassword = await bcrypt.compare(password, user.password);

      if (!matchedPassword) return done(null, false, { message: 'Incorrect password.' });

      /*req.session.authenticated = true;
      req.session.user = {
        email,
        password
      };*/
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  users.get('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
    if (err) return done(err);

    done(null, user);
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
  res.redirect('profile');
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('login');
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