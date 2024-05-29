const express = require('express');
const app = express();
const flash = require('express-flash');
const db = require('../db/index');
const bcrypt = require('bcrypt');

app.use(flash());

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
  const { first_name, last_name, email, password, reenter_password } = req.body;

  if (password === reenter_password) {
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const userCheckArr = userCheck.rows;

    if (userCheckArr.length != 0) {
      req.flash('email_exists', "Email already registered. Please try another email or log in.");
      res.redirect('/register');
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const created = new Date();

      db.query('INSERT INTO users (first_name, last_name, email, password, created) VALUES ($1, $2, $3, $4, $5) RETURNING *', [first_name.toLowerCase(), last_name.toLowerCase(), email.toLowerCase(), hashedPassword, created], (err, results) => {
        if (err) {
          throw err;
        }
        req.flash('success_msg', "You have been registered! Please log in.");
        res.redirect('/login');
      });
    }
  }
  else {
    req.flash('password_mismatch', "Password fields do not match. Please try again.");
    res.redirect('back');
  }
}

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const modified = new Date();

  db.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, modified = $5 WHERE id = $6', [first_name.toLowerCase(), last_name.toLowerCase(), email.toLowerCase(), hashedPassword, modified, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.redirect('/dashboard');
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