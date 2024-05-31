const express = require('express');
const subdirectoriesRouter = express.Router();
const passport = require('passport');
require('../config/passport');
const auth = require('../auth/auth');
const users = require('../models/users');
const products = require('../models/products');
const carts = require('../models/carts');
const carts_products = require('../models/carts_products');
const orders = require('../models/orders');
const orders_products = require('../models/orders_products');

//Root
subdirectoriesRouter.get('/',
  (req, res) => {
    res.render('index');
  }
);

//Login
subdirectoriesRouter.get('/login',
  auth.checkLoggedIn,
  (req, res) => {
    res.render('login');
  }
);
subdirectoriesRouter.post('/login',
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true,
    }
  ),
  (req, res) => {
    res.redirect(`/users/${req.user.id}/dashboard`)
  }
);

//Register
subdirectoriesRouter.get('/register',
  auth.checkLoggedIn,
  (req, res) => {
  res.render('register');
});
subdirectoriesRouter.post('/register', users.createUser);

//Logout
subdirectoriesRouter.get('/users/:id/logout',
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

//Dashboard
subdirectoriesRouter.get('/users/:id/dashboard', 
  auth.checkAuthenticated,
  carts.getCartByUserId,
  carts.createCart,
  (req, res) => {
    res.render('dashboard', { user: req.user });
  }
);

//Shop
subdirectoriesRouter.get('/users/:id/shop',
  auth.checkAuthenticated,
  carts.getCartByUserId,
  products.getProducts,
  (req, res) => {
    res.render('shop', { user: req.user, product_list: req.products, cart_id: req.cart[0].id });
  }
);

//Cart
subdirectoriesRouter.get('/users/:id/cart',
  auth.checkAuthenticated,
  carts.getCartByUserId,
  carts_products.getCartsProductsByCartId,
  (req, res) => {
    res.render('cart', { user: req.user, cart_products: req.cart_products, cart_id: req.cart[0].id, total: req.cart.total });
  }
);

//Checkout
subdirectoriesRouter.post('/users/:id/cart/:cart_id/checkout',
  auth.checkAuthenticated,
  orders.createOrder,
  orders_products.addToOrder,
  carts_products.deleteAllInCart,
  carts.deleteCart,
  (req, res) => {
    res.redirect(`/users/${req.params.id}/dashboard`);
  }
);

//Orders
subdirectoriesRouter.get('/users/:id/orders',
  auth.checkAuthenticated,
  orders.getOrdersByUserId,
  orders_products.getOrdersProductsByOrderId,
  (req, res) => {
    res.render('orders', { user: req.user, orders: req.orders, order_products: req.order_products });
  }
);

module.exports = subdirectoriesRouter;