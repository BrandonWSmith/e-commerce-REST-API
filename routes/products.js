const db = require('../db/index');

const getProducts = (req, res) => {
  db.query('SELECT * FROM products ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const createProduct = (req, res) => {
  const { name, price } = req.body;

  db.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product added with ID: ${results.rows[0].id}`);
  });
}

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  db.query('UPDATE products SET name = $1, price = $2 WHERE id = $3', [name, price, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product modified with ID: ${id}`);
  });
}

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM products WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product deleted with ID: ${id}`);
  });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}