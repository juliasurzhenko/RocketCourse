const userRouter = require('express').Router();
const users = require("../../database/users.json");
const controller = require('./user.controller');
const mdlwr = require('./user.middleware')

userRouter.get('/', controller.getAllUser );
userRouter.post('/', controller.createUser);

userRouter.get('/:userId', mdlwr.checkIsUserExists, controller.getUserbyId);
userRouter.put('/:userId', mdlwr.checkIsUserExists, controller.updateUser );
userRouter.delete('/:userId', mdlwr.checkIsUserExists, controller.deleteUser );


module.exports = userRouter;