const db = require('../db/index');
const orders = require('./orders');

const getCarts = (req, res) => {
  db.query('SELECT * FROM carts ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getCartById = (req, res) => {
  const cart_id = parseInt(req.params.id);

  db.query('SELECT * FROM carts WHERE id = $1', [cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getCartByUserId = (req, res, next) => {
  const user_id = parseInt(req.params.id);

  db.query('SELECT * FROM carts WHERE user_id = $1', [user_id], (err, results) => {
    if (err) {
      throw err;
    }
    req.cart = results.rows;
    res.status(200);
    next();
  });
}

const createCart = (req, res, next) => {
  if (req.cart.length < 1) {
    const user_id = parseInt(req.params.id);
    const created = new Date();

    db.query('INSERT INTO carts (user_id, created) VALUES ($1, $2) RETURNING *', [user_id, created], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(`Cart created with ID: ${results.rows[0].id}`);
      req.cart = results.rows;
      res.status(201);
    });
  }
  next();
}

const updateCart = (req, res) => {
  const cart_id = parseInt(req.params.cart_id);
  const modified = new Date();

  db.query('UPDATE carts SET modified = $1 WHERE id = $2', [modified, cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Cart modified with ID: ${cart_id}`);
  });
}

const deleteCart = (req, res, next) => {
  const cart_id = parseInt(req.params.cart_id) || parseInt(req.cart[0].id);

  db.query('DELETE FROM carts WHERE id = $1', [cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    //res.status(200).send(`Cart deleted with ID: ${cart_id}`);
    console.log(`Cart deleted with ID: ${cart_id}`);
    next();
  });
}

module.exports = {
  getCarts,
  getCartById,
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
}