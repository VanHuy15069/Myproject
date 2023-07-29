import express from 'express'
import * as categoryController from '../controller/categotyController'
import * as upload from '../controller/uploadController'

const categoryRouter = express.Router()
    categoryRouter.post('/addCategory', upload.uploadImage ,categoryController.addCategory)
    categoryRouter.patch('/categoryName/:id', categoryController.updateCategory)
    categoryRouter.patch('/image/:id', upload.uploadImage, categoryController.updateImage)
    categoryRouter.delete('/:id', categoryController.deleteCategory)
    categoryRouter.get('/getCategory', categoryController.getCategory)
    categoryRouter.get('/getOne/:id', categoryController.getOneCategory)
export default categoryRouter