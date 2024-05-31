const express = require('express');
const auth = require('../auth/auth');
const productsRouter = express.Router();
const products = require('../models/products');

//Get All products
productsRouter.get('/',
  auth.checkAuthenticated,
  products.getProducts
);

//Get A Product By Product ID
productsRouter.get('/:id',
  auth.checkAuthenticated,
  products.getProductById
);

//Get A Product By Name
productsRouter.get('/',
  auth.checkAuthenticated,
  products.getProductByName
);

//Create New Product
productsRouter.post('/',
  auth.checkAuthenticated,
  products.createProduct
);

//Update Product
productsRouter.put('/:id',
  auth.checkAuthenticated,
  products.updateProduct
);

//Delete Product
productsRouter.delete('/:id',
  auth.checkAuthenticated,
  products.deleteProduct
);

module.exports = productsRouter;