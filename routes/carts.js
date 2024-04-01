const db = require('../db/index');

const getCarts = (req, res) => {
  db.query('SELECT * FROM carts ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getCartById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('SELECT * FROM carts WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const createCart = (req, res) => {
  const created = new Date();

  db.query('INSERT INTO carts (created) VALUES ($1) RETURNING *', [created], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Cart created with ID: ${results.rows[0].id}`);
  });
}

const updateCart = (req, res) => {
  const id = parseInt(req.params.id);

  const modified = new Date();

  db.query('UPDATE carts SET modified = $1 WHERE id = $2', [modified, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Cart modified with ID: ${id}`);
  });
}

const deleteCart = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM carts WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Cart deleted with ID: ${id}`);
  });
}

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
}