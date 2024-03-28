const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require('passport');
require('./config/passport');
const flash = require('express-flash');
const users = require('./routes/users');
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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