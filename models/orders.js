const express = require('express');
const app = express();
const flash = require('express-flash');
const db = require('../db/index');

app.use(flash());

const getOrders = (req, res) => {
  db.query('SELECT * FROM orders ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getOrderById = (req, res) => {
  const order_id = parseInt(req.params.id);

  db.query('SELECT * FROM orders WHERE id = $1', [order_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getOrdersByUserId = (req, res, next) => {
  const user_id = parseInt(req.params.id);

  db.query('SELECT * FROM orders WHERE user_id = $1', [user_id], (err, results) => {
    if (err) {
      throw err;
    }
    req.orders = results.rows;
    res.status(200);
    next();
  });
}

const createOrder = (req, res, next) => {
  const user_id = parseInt(req.params.id);
  const created = new Date();

  db.query('INSERT INTO orders (user_id, created) VALUES ($1, $2) RETURNING *', [user_id, created], (err, results) => {
    if (err) {
      throw err;
    }
    //res.status(201).send(`Order created with ID: ${results.rows[0].id}`);
    req.flash('order_created', `Order created with ID: ${results.rows[0].id}`);
    next();
  });
}

const updateOrder = (req, res) => {
  const order_id = parseInt(req.params.order_id);
  const modified = new Date();

  db.query('UPDATE orders SET modified = $1 WHERE id = $2', [modified, order_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Order modified with ID: ${order_id}`);
  });
}

const deleteOrder = (req, res, next) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM orders WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    console.log(`Order deleted with ID: ${id}`);
    res.status(200);
    next();
  });
}


module.exports = {
  getOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder
}