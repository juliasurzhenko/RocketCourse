const userRouter = require('express').Router();

const users = require("../../database/users");

const controller = require('./user.controller')

userRouter.get('/', controller.getAllUser );
userRouter.post('/', controller.createUser);

userRouter.get('/:userId', controller.getUserbyId);
userRouter.put('/:userId', controller.updateUser );
userRouter.delete('/:userId', controller.deleteUser );


module.exports = userRouter;