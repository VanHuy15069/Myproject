import express from 'express'
import * as musicController from '../controller/musicController'
import * as upload from '../controller/uploadController'

const musicRouter = express.Router()
    musicRouter.post('/addMusic', upload.uploadManyFiles, musicController.addMusic)
    musicRouter.patch('/updateImage/:id', upload.uploadImage, musicController.updateImage)
    musicRouter.patch('/updateMusic/:id', upload.uploadMusic, musicController.updateMusic)
    musicRouter.put('/:id', musicController.updateInforMusic)
    musicRouter.patch('/upgrateVip/:id', musicController.upgrateVip)
    musicRouter.get('/getByCategory/:id', musicController.getByCategory)
    musicRouter.get('/getBySinger/:id', musicController.getBySinger)
    musicRouter.get('/searchNameMusic', musicController.serchNameMusic)
    musicRouter.patch('/countViews/:id', musicController.countViews)
    musicRouter.delete('/:id', musicController.deleteMusic)
    musicRouter.get('/getAllMusic', musicController.getAllMusic)
    musicRouter.get('/getOfWeek', musicController.getOfWeekly)
    musicRouter.get('/getMusic/:id', musicController.getOneMusic)
    musicRouter.get('/getMusicFavorite/:id', musicController.favorite)
    musicRouter.get('/getTopNewMusic', musicController.getTopNewMusic)
    musicRouter.get('/randomMusic', musicController.randomMusic)
    musicRouter.get('/getTheSameMusic/:id', musicController.getTheSameMusic)
    musicRouter.get('/getMusicOfMonth', musicController.getMusicOfMonth)
    musicRouter.get('/countCategory', musicController.countCategory)
    musicRouter.get('/countNation', musicController.countNation)
    musicRouter.get('/countTopic', musicController.countTopic)
    musicRouter.get('/getTopMusic', musicController.getTopMusic)
export default musicRouter