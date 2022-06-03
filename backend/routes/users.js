const usersRouter = require('express').Router();
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/validate');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', validateUserId, getUserById);
usersRouter.patch('/users/me', validateUpdateUser, updateUser);

usersRouter.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
