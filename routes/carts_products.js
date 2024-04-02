const db = require('../db/index');

const getCartsProducts = (req, res) => {
  db.query('SELECT * FROM carts_products ORDER BY cart_id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getCartsProductsByCartId = (req, res) => {
  const cart_id = parseInt(req.params.id);

  db.query('SELECT * FROM carts_products WHERE cart_id = $1', [cart_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const addToCart = (req, res) => {
  const cart_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);

  const added = new Date();

  db.query('INSERT INTO carts_products (product_id, cart_id, added) VALUES ($1, $2, $3) RETURNING *', [product_id, cart_id, added], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product ID: ${product_id} added to cart ID: ${cart_id}`);
  });
}

const updateInCart = (req, res) => {
  const cart_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);

  const modified = new Date();

  db.query('UPDATE carts_products SET product_id = $1, modified = $3 WHERE cart_id = $2', [product_id, cart_id, modified], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID: ${product_id} updated in cart ID: ${cart_id}`);
  });
}

const deleteInCart = (req, res) => {
  const cart_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);

  db.query('DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID ${product_id} deleted from cart ID: ${cart_id}`);
  });
}

module.exports = {
  getCartsProducts,
  getCartsProductsByCartId,
  addToCart,
  updateInCart,
  deleteInCart
}