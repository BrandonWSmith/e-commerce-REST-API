const express = require('express');
const ordersProductsRouter = express.Router();
const db = require('../db/index');
const orders_products = require('../models/orders_products');

ordersProductsRouter.get('/orders_products', orders_products.getOrderProducts);
ordersProductsRouter.get('/users/:id/orders/:order_id/products', orders_products.getOrdersProductsByOrderId);
ordersProductsRouter.post('/users/:id/orders/:order_id/products', orders_products.addToOrder, async (req, res) => {
  const getProductIds = await db.query('SELECT product_id FROM orders_products WHERE order_id = $1', [req.params.order_id]);
  const product_ids = [];
  for (const product in getProductIds.rows) {
    product_ids.push(parseInt(getProductIds.rows[0].product_id));
  }

  res.status(201).send(`Product IDs: ${product_ids.toString()} added to order ID: ${req.params.order_id}`);
});
ordersProductsRouter.put('/users/:id/orders/:order_id/products', orders_products.updateInOrder);
ordersProductsRouter.delete('/users/:id/orders/:order_id/products', orders_products.deleteInOrder);

module.exports = ordersProductsRouter;