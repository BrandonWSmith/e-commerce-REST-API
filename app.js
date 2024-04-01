const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('./config/passport');
const users = require('./routes/users');
const products = require('./routes/products');
const carts = require('./routes/carts');

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
    req.flash('logout_msg', "You have been logged out.")
    res.redirect('/');
  });
});

app.get('/shop', (req, res) => {
  res.render('shop');
});

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUsersById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
app.get('/products', products.getProducts);
app.get('/products/:id', products.getProductById);
app.get('/products?name={name}', products.getProductByName);
app.post('/products', products.createProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);
app.get('/carts', carts.getCarts);
app.get('/carts/:id', carts.getCartById);
app.post('/carts', carts.createCart);
app.put('/carts/:id', carts.updateCart);
app.delete('/carts/:id', carts.deleteCart);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});