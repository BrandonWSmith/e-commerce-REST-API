const db = require('../db/index');

const getOrderProducts = (req, res) => {
  db.query('SELECT * FROM orders_products ORDER BY order_id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const getOrdersProductsByOrderId = (req, res) => {
  const order_id = parseInt(req.params.id);

  db.query('SELECT * FROM orders_products WHERE order_id = $1', [order_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows);
  });
}

const addToOrder = async (req, res) => {
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);
  const quantity = parseInt(req.query.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);
  const added = new Date();
  
  const checkExists = await db.query('SELECT * FROM orders_products WHERE order_id = $1 AND product_id = $2', [order_id, product_id]);

  if (checkExists.rows.length != 0) {
    res.status(400).send(`Product ID: ${product_id} already in order ID: ${order_id}`);
  }
  else {
    db.query('INSERT INTO orders_products (quantity, price, order_id, product_id, added) VALUES ($1, $2, $3, $4, $5) RETURNING *', [quantity, price, order_id, product_id, added], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send(`Product ID: ${product_id} added to order ID: ${order_id}`);
    });
  }
}

const updateInOrder = async (req, res) => {
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);
  const quantity = parseInt(req.query.quantity);
  const getPrice = await db.query('SELECT price FROM products WHERE id = $1', [product_id]);
  const price = Object.values(getPrice.rows[0]).toString().slice(1);

  const modified = new Date();

  db.query('UPDATE orders_products SET quantity = $1, price = $2, order_id = $3, product_id = $4, modified = $5', [quantity, price, order_id, product_id, modified], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID: ${product_id} updated in order ID: ${order_id}`);
  });
}

const deleteInOrder = (req, res) => {
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.query.product_id);

  db.query('DELETE FROM orders_products WHERE order_id = $1 AND product_id = $2', [order_id, product_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product ID ${product_id} deleted from cart ID: ${order_id}`);
  });
}

module.exports = {
  getOrderProducts,
  getOrdersProductsByOrderId,
  addToOrder,
  updateInOrder,
  deleteInOrder
}