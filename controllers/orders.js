const express = require('express');
const auth = require('../auth/auth');
const db = require('../db/index');
const ordersRouter = express.Router();
const orders = require('../models/orders');
const orders_products = require('../models/orders_products');

//Get All Orders
ordersRouter.get('/orders',
  auth.checkAuthenticated,
  orders.getOrders
);

//Get Order By Order ID
ordersRouter.get('/orders/:id',
  auth.checkAuthenticated,
  orders.getOrderById
);

//Get All Orders By User ID
ordersRouter.get('/users/:id/orders',
  auth.checkAuthenticated,
  orders.getOrdersByUserId
);

//Create New Order
ordersRouter.post('/users/:id/orders',
  auth.checkAuthenticated,
  orders.createOrder,
  async (req, res) => {
    const getOrderId = await db.query('SELECT id FROM orders ORDER BY id DESC');
    const order_id = Object.values(getOrderId.rows[0]).toString();

    res.status(201).send(`Order created with ID: ${order_id}`);
  }
);

//Update Order
ordersRouter.put('/users/:id/orders/:order_id',
  auth.checkAuthenticated,
  orders.updateOrder
);

//Delete Order
ordersRouter.delete('/orders/:id',
  auth.checkAuthenticated,
  orders_products.deleteAllInOrder,
  orders.deleteOrder,
  (req, res) => {
    res.redirect(`/users/${req.user.id}/orders`);
  }
);

module.exports = ordersRouter;