const express = require('express');
const cartsRouter = express.Router();
const carts = require('../models/carts');

cartsRouter.get('/carts', carts.getCarts);
cartsRouter.get('/carts/:id', carts.getCartById);
cartsRouter.get('/users/:id/cart', carts.getCartByUserId);
cartsRouter.post('/users/:id/cart', carts.createCart);
cartsRouter.put('/users/:id/cart/:cart_id', carts.updateCart);
cartsRouter.delete('/users/:id/cart/:cart_id', carts.deleteCart, (req, res) => {
  res.status(200).send(`Cart deleted with ID: ${req.params.cart_id}`);
});

module.exports = cartsRouter;