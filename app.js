const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('./config/passport');
const db = require('./db/index');
const users = require('./routes/users');
const products = require('./routes/products');
const carts = require('./routes/carts');
const carts_products = require('./routes/carts_products');
const orders = require('./routes/orders');
const orders_products = require('./routes/orders_products');

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

//Root Endpoint
app.get('/', (req, res) => {
  res.render('index');
});

//Login Endpoints
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', passport.authenticate('local',
  {
    successRedirect: `/users/:id/dashboard`,
    failureRedirect: '/login',
    failureFlash: true
  }
));

//Register Endpoints
app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', users.createUser);

//Logout Endpoint
app.get('/users/:id/logout', carts.getCartByUserId, carts_products.getCartsProductsByCartId, (req, res, next) => {
  if (req.cart_products && req.cart_products.length < 1) {
    carts.deleteCart(req, res, next);
  }
  req.logout((err) => {
    if (err) return next (err);
    req.flash('logout_msg', "You have been logged out.")
    res.redirect('/');
  });
});

//Dashboard Endpoint
app.get('/users/:id/dashboard', (req, res) => {
  res.render('dashboard', { user: req.user });
});

//Shop Endpoint
app.get('/users/:id/shop', carts.getCartByUserId, carts.createCart, async (req, res) => {
  const results = await fetch('http://localhost:3000/products');
  const productList = await results.json();

  res.render('shop', { productList, user: req.user, cart_id: req.cart[0].id });
});

//Checkout Endpoint
app.post('/users/:id/cart/:cart_id/checkout', orders.createOrder, orders_products.addToOrder, carts_products.deleteAllInCart, carts.deleteCart, (req, res) => {
  res.send(req.session.flash);
});

//Users Endpoints
app.get('/users', users.getUsers);
app.get('/users/:id', users.getUsersById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

//Products Endpoints
app.get('/products', products.getProducts);
app.get('/products/:id', products.getProductById);
app.get('/products?name={name}', products.getProductByName);
app.post('/products', products.createProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

//Carts Endpoints
app.get('/carts', carts.getCarts);
app.get('/carts/:id', carts.getCartById);
app.get('/users/:id/cart', carts.getCartByUserId);
app.post('/users/:id/cart', carts.createCart);
app.put('/users/:id/cart/:cart_id', carts.updateCart);
app.delete('/users/:id/cart/:cart_id', carts.deleteCart, (req, res) => {
  res.status(200).send(`Cart deleted with ID: ${req.params.cart_id}`);
});

//Carts Products Endpoints
app.get('/carts_products', carts_products.getCartsProducts);
app.get('/users/:id/cart/:cart_id/products', carts_products.getCartsProductsByCartId);
app.post('/users/:id/cart/:cart_id/products', carts_products.addToCart);
app.put('/users/:id/cart/:cart_id/products', carts_products.updateInCart);
app.delete('users/:id/cart/:cart_id/products', carts_products.deleteInCart, (req, res) => {
  res.status(200).send(`Product ID: ${req.query.product_id} deleted from cart ID: ${req.params.cart_id}`);
});

//Orders Endpoints
app.get('/orders', orders.getOrders);
app.get('/orders/:id', orders.getOrderById);
app.get('/users/:id/orders', orders.getOrdersByUserId);
app.post('/users/:id/orders', orders.createOrder, async (req, res) => {
  const getOrderId = await db.query('SELECT id FROM orders ORDER BY id DESC');
  const order_id = Object.values(getOrderId.rows[0]).toString();

  res.status(201).send(`Order created with ID: ${order_id}`);
});
app.put('/users/:id/orders/:order_id', orders.updateOrder);
app.delete('/orders/:id', orders.deleteOrder);

//Orders Products Endpoints
app.get('/orders_products', orders_products.getOrderProducts);
app.get('/users/:id/orders/:order_id/products', orders_products.getOrdersProductsByOrderId);
app.post('/users/:id/orders/:order_id/products', orders_products.addToOrder, async (req, res) => {
  const getProductIds = await db.query('SELECT product_id FROM orders_products WHERE order_id = $1', [req.params.order_id]);
  const product_ids = [];
  for (const product in getProductIds.rows) {
    product_ids.push(parseInt(getProductIds.rows[0].product_id));
  }

  res.status(201).send(`Product IDs: ${product_ids.toString()} added to order ID: ${req.params.order_id}`);
});
app.put('/users/:id/orders/:order_id/products', orders_products.updateInOrder);
app.delete('/users/:id/orders/:order_id/products', orders_products.deleteInOrder);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});