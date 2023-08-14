import express from 'express'
import * as favoriteController from '../controller/favoriteController'

const favoriteRouter = express.Router()
    favoriteRouter.post('/addFavorite', favoriteController.addFavorite)
    favoriteRouter.get('/getMusic/:id', favoriteController.getMusic)
    favoriteRouter.get('/isFavorite', favoriteController.isFavorite)
    favoriteRouter.delete('/delete', favoriteController.deleteFavorite)
    favoriteRouter.get('/countFavorite', favoriteController.getFavorite)
export default favoriteRouter