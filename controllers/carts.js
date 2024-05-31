const express = require('express');
const auth = require('../auth/auth');
const cartsRouter = express.Router();
const carts = require('../models/carts');

//Get All Carts
cartsRouter.get('/carts',
  auth.checkAuthenticated,
  carts.getCarts
);

//Get Cart By Cart ID
cartsRouter.get('/carts/:id',
  auth.checkAuthenticated,
  carts.getCartById
);

//Get Cart By User ID
cartsRouter.get('/users/:id/cart',
  auth.checkAuthenticated,
  carts.getCartByUserId
);

//Create New Cart
cartsRouter.post('/users/:id/cart',
  auth.checkAuthenticated,
  carts.createCart
);

//Update Cart
cartsRouter.put('/users/:id/cart/:cart_id',
  auth.checkAuthenticated,
  carts.updateCart
);

//Delete Cart
cartsRouter.delete('/users/:id/cart/:cart_id',
  auth.checkAuthenticated,
  carts.deleteCart,
  (req, res) => {
    res.status(200).send(`Cart deleted with ID: ${req.params.cart_id}`);
  }
);

module.exports = cartsRouter;