const express = require('express');
const usersRouter = express.Router();
const users = require('../models/users');

usersRouter.get('/', users.getUsers);
usersRouter.get('/:id', users.getUsersById);
usersRouter.post('/', users.createUser);
usersRouter.put('/:id', users.updateUser);
usersRouter.delete('/:id', users.deleteUser);

module.exports = usersRouter;