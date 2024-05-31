const express = require('express');
const ordersProductsRouter = express.Router();
const auth = require('../auth/auth');
const db = require('../db/index');
const orders_products = require('../models/orders_products');

//Get All Orders' Products
ordersProductsRouter.get('/orders_products',
  auth.checkAuthenticated,
  orders_products.getOrderProducts
);

//Get An Order's Products By Order ID
ordersProductsRouter.get('/users/:id/orders/:order_id/products',
  auth.checkAuthenticated,
  orders_products.getOrdersProductsByOrderId
);

//Add All Items To Order
ordersProductsRouter.post('/users/:id/orders/:order_id/products',
  auth.checkAuthenticated,
  orders_products.addToOrder,
  async (req, res) => {
    const getProductIds = await db.query('SELECT product_id FROM orders_products WHERE order_id = $1', [req.params.order_id]);
    const product_ids = [];
    for (const product in getProductIds.rows) {
      product_ids.push(parseInt(getProductIds.rows[0].product_id));
    }

    res.status(201).send(`Product IDs: ${product_ids.toString()} added to order ID: ${req.params.order_id}`);
  }
);

//Update An Item In Order
ordersProductsRouter.put('/users/:id/orders/:order_id/products',
  auth.checkAuthenticated,
  orders_products.updateInOrder
);

//Delete An Item In Order
ordersProductsRouter.delete('/users/:id/orders/:order_id/products',
  auth.checkAuthenticated,
  orders_products.deleteInOrder
);

module.exports = ordersProductsRouter;