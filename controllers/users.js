const express = require('express');
const auth = require('../auth/auth');
const usersRouter = express.Router();
const users = require('../models/users');

//Get All Users
usersRouter.get('/',
  auth.checkAuthenticated,
  users.getUsers
);

//Get A User By User ID
usersRouter.get('/:id',
  auth.checkAuthenticated,
  users.getUsersById
);

//Create New User
usersRouter.post('/',
  auth.checkAuthenticated,
  users.createUser
);

//Update User
usersRouter.put('/:id',
  auth.checkAuthenticated,
  users.updateUser
);

//Delete User
usersRouter.delete('/:id',
  auth.checkAuthenticated,
  users.deleteUser
);

module.exports = usersRouter;