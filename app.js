const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('./config/passport');
const users = require('./routes/users');
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'Password1',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }
));

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', users.createUser);

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: req.user.first_name });
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