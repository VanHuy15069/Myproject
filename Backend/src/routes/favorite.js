import express from 'express'
import * as favoriteController from '../controller/favoriteController'

const favoriteRouter = express.Router()
    favoriteRouter.post('/addFavorite', favoriteController.addFavorite)
    favoriteRouter.get('/getMusic/:id', favoriteController.getMusic)
    favoriteRouter.delete('/delete', favoriteController.deleteFavorite)
export default favoriteRouter