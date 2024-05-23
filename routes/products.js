const db = require('../db/index');

const getProducts = (req, res, next) => {
  db.query('SELECT * FROM products ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    req.products = results.rows;
    res.status(200);
    next();
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

const getProductByName = (req, res) => {
  const name = req.params.name;

  db.query('SELECT * FROM products WHERE name = $1', [name], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const createProduct = (req, res) => {
  const { name, price, description } = req.body;

  const created = new Date();

  db.query('INSERT INTO products (name, price, description, created) VALUES ($1, $2, $3, $4) RETURNING *', [name, price, description, created], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product added with ID: ${results.rows[0].id}`);
  });
}

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;

  const modified = new Date();

  db.query('UPDATE products SET name = $1, price = $2, description = $3, modified = $4 WHERE id = $5', [name, price, description, modified, id], (err, results) => {
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
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
}