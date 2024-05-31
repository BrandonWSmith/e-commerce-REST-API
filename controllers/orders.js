const express = require('express');
const ordersRouter = express.Router();
const db = require('../db/index');
const orders = require('../models/orders');
const orders_products = require('../models/orders_products');

ordersRouter.get('/orders', orders.getOrders);
ordersRouter.get('/orders/:id', orders.getOrderById);
ordersRouter.get('/users/:id/orders', orders.getOrdersByUserId);
ordersRouter.post('/users/:id/orders', orders.createOrder, async (req, res) => {
  const getOrderId = await db.query('SELECT id FROM orders ORDER BY id DESC');
  const order_id = Object.values(getOrderId.rows[0]).toString();

  res.status(201).send(`Order created with ID: ${order_id}`);
});
ordersRouter.put('/users/:id/orders/:order_id', orders.updateOrder);
ordersRouter.delete('/orders/:id', orders_products.deleteAllInOrder, orders.deleteOrder, (req, res) => {
  res.redirect('back');
});

module.exports = ordersRouter;