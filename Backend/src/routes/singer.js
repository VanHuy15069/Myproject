import express from 'express'
import * as singerController from '../controller/singerController'
import * as upload from '../controller/uploadController'

const singerRouter = express.Router()
    singerRouter.post('/addSinger', upload.uploadImage, singerController.addSinger)
    singerRouter.put('/:id', singerController.updateSinger)
    singerRouter.patch('/:id', upload.uploadImage, singerController.updateAvata)
    singerRouter.delete('/:id', singerController.deleteSinger)
    singerRouter.get('/singerInfor/:id', singerController.getOneSinger)
    singerRouter.get('/getAll', singerController.getAllSinger)
    singerRouter.get('/searchSinger', singerController.searchSinger)
    singerRouter.get('/randomSinger/:id', singerController.randomSinger)
    singerRouter.get('/getByCategory/:id', singerController.getByCategory)
    singerRouter.get('/getByTopic/:id', singerController.getByTopic)
    singerRouter.get('/getByNation/:id', singerController.getByNation)
export default singerRouter