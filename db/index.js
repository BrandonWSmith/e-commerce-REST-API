const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E-Commerce REST API',
  password: 'postgres',
  port: 5432
});

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const createUser = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, password], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`User added with ID: ${results.rows[0].id}`);
  });
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password } = req.body;

  pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5', [first_name, last_name, email, password, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User modified with ID: ${id}`);
  });
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
}

const getProducts = (req, res) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const createProduct = (req, res) => {
  const { name, price } = req.body;

  pool.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product added with ID: ${results.rows[0].id}`);
  });
}

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  pool.query('UPDATE products SET name = $1, price = $2 WHERE id = $3', [name, price, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product modified with ID: ${id}`);
  });
}

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM products WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product deleted with ID: ${id}`);
  });
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}