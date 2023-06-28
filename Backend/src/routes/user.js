import express from 'express'
import * as userController from '../controller/userController'

const userRouter = express.Router()
    userRouter.get('/userInfo/:id', userController.getOneUser)
    userRouter.get('/getAll', userController.getAllUser)
    userRouter.patch('/upgrade/:id', userController.vipUpgrade)
    userRouter.put('/:id', userController.updateUser)
    userRouter.delete('/:id', userController.deleteUser)
export default userRouter