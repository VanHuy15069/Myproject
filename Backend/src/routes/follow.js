import express from 'express'
import * as followController from '../controller/followController'

const followRouter = express.Router()
    followRouter.post('/addFollow', followController.addFollow)
    followRouter.get('/countFollow/:id', followController.countFollows)
    followRouter.get('/getSinger/:id', followController.getSinger)
    followRouter.delete('/delete', followController.deleteFollow)
export default followRouter