import express from 'express'
import * as userController from '../controller/userController'
import * as upload from '../controller/uploadController'
const userRouter = express.Router()
    userRouter.get('/userInfo/:id', userController.getOneUser)
    userRouter.get('/getAll', userController.getAllUser)
    userRouter.patch('/upgrade/:id', userController.vipUpgrade)
    userRouter.put('/:id', userController.updateUser)
    userRouter.delete('/:id', userController.deleteUser)
    userRouter.patch('/updateImg/:id', upload.uploadImage,userController.updateImage)
    userRouter.patch('/updatePassword/:id', userController.updatePassword)
export default userRouter