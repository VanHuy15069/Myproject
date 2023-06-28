import express from 'express'
import * as categoryController from '../controller/categotyController'

const categoryRouter = express.Router()
    categoryRouter.post('/addCategory', categoryController.addCategory)
    categoryRouter.patch('/:id', categoryController.updateCategory)
    categoryRouter.delete('/:id', categoryController.deleteCategory)
    categoryRouter.get('/getCategory', categoryController.getCategory)
export default categoryRouter