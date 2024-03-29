const db = require('../db/index');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const userCheckArr = userCheck.rows;

  if (userCheckArr.length != 0) {
    return res.status(400).send(`${email} already exists`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, hashedPassword], (err, results) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
}

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  db.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5', [first_name, last_name, email, hashedPassword, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User modified with ID: ${id}`);
  });
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
}