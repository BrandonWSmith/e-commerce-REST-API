const express = require('express');
const auth = require('../auth/auth');
const cartsProductsRouter = express.Router();
const carts_products = require('../models/carts_products');

//Get All Carts' Products
cartsProductsRouter.get('/carts_products',
  auth.checkAuthenticated,
  carts_products.getCartsProducts
);

//Get A Cart's Products By Cart ID
cartsProductsRouter.get('/users/:id/cart/:cart_id/products',
  auth.checkAuthenticated,
  carts_products.getCartsProductsByCartId
);

//Add Item To Cart
cartsProductsRouter.post('/users/:id/cart/:cart_id/products',
  auth.checkAuthenticated,
  carts_products.addToCart,
  (req, res) => {
    res.redirect(`/users/${req.params.id}/shop`);
  }
);

//Update Item In Cart
cartsProductsRouter.put('/users/:id/cart/:cart_id/products',
  auth.checkAuthenticated,
  carts_products.updateInCart
);

//Delete Item In Cart
cartsProductsRouter.delete('/users/:id/cart/:cart_id/products',
  auth.checkAuthenticated,
  carts_products.deleteInCart,
  (req, res) => {
    res.redirect(`/users/${req.params.id}/shop`);
  }
);

module.exports = cartsProductsRouter;