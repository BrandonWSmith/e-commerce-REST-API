const express = require('express');
const productsRouter = express.Router();
const products = require('../models/products');

productsRouter.get('/', products.getProducts);
productsRouter.get('/:id', products.getProductById);
productsRouter.get('/', products.getProductByName);
productsRouter.post('/', products.createProduct);
productsRouter.put('/:id', products.updateProduct);
productsRouter.delete('/:id', products.deleteProduct);

module.exports = productsRouter;