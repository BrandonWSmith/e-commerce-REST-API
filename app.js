const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('./config/passport');
const methodOverride = require('method-override');
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const cartsRouter = require('./controllers/carts');
const cartsProductsRouter = require('./controllers/carts_products');
const ordersRouter = require('./controllers/orders');
const ordersProductsRouter = require('./controllers/orders_products');
const db = require('./db/index');
const users = require('./models/users');
const products = require('./models/products');
const carts = require('./models/carts');
const carts_products = require('./models/carts_products');
const orders = require('./models/orders');
const orders_products = require('./models/orders_products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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
app.get('/',
  (req, res) => {
    res.render('index');
  }
);

//Login Endpoints
app.get('/login',
  (req, res) => {
    res.render('login');
  }
);
app.post('/login',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  (req, res) => {
    res.redirect(`/users/${req.user.id}/dashboard`);
  }
);

//Register Endpoints
app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', users.createUser);

//Logout Endpoint
app.get('/users/:id/logout',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  carts.getCartByUserId,
  carts_products.getCartsProductsByCartId,
  (req, res, next) => {
    if (req.cart_products && req.cart_products.length < 1) {
      carts.deleteCart(req, res, next);
    }
    req.logout((err) => {
      if (err) return next (err);
      req.flash('logout_msg', "You have been logged out.")
      res.redirect('/');
    });
  }
);

//Dashboard Endpoint
app.get('/users/:id/dashboard', 
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  carts.getCartByUserId,
  carts.createCart,
  (req, res) => {
    res.render('dashboard', { user: req.user });
  }
);

//Shop Endpoint
app.get('/users/:id/shop',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  carts.getCartByUserId,
  products.getProducts,
  (req, res) => {
    res.render('shop', { user: req.user, product_list: req.products, cart_id: req.cart[0].id });
  }
);

//Cart Endpoint
app.get('/users/:id/cart',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  carts.getCartByUserId,
  carts_products.getCartsProductsByCartId,
  (req, res) => {
    res.render('cart', { user: req.user, cart_products: req.cart_products, cart_id: req.cart[0].id, total: req.cart.total });
  }
);

//Checkout Endpoint
app.post('/users/:id/cart/:cart_id/checkout',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  orders.createOrder,
  orders_products.addToOrder,
  carts_products.deleteAllInCart,
  carts.deleteCart,
  (req, res) => {
    res.redirect(`/users/${req.params.id}/dashboard`);
  }
);

//Orders Endpoint
app.get('/users/:id/orders',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true
    }
  ),
  orders.getOrdersByUserId,
  orders_products.getOrdersProductsByOrderId,
  (req, res) => {
    res.render('orders', { user: req.user, orders: req.orders, order_products: req.order_products });
  }
);

//Routers
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', cartsRouter);
app.use('/', cartsProductsRouter);
app.use('/', ordersRouter);
app.use('/', ordersProductsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});