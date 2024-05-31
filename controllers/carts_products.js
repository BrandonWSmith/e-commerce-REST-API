const express = require('express');
const cartsProductsRouter = express.Router();
const carts_products = require('../models/carts_products');

cartsProductsRouter.get('/carts_products', carts_products.getCartsProducts);
cartsProductsRouter.get('/users/:id/cart/:cart_id/products', carts_products.getCartsProductsByCartId);
cartsProductsRouter.post('/users/:id/cart/:cart_id/products', carts_products.addToCart, (req, res) => {
  res.redirect('back');
});
cartsProductsRouter.put('/users/:id/cart/:cart_id/products', carts_products.updateInCart);
cartsProductsRouter.delete('/users/:id/cart/:cart_id/products', carts_products.deleteInCart, (req, res) => {
  res.redirect('back');
});

module.exports = cartsProductsRouter;