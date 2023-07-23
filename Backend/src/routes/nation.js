import express from 'express'
import * as nationController from '../controller/nationController'

const nationRouter = express.Router()
    nationRouter.post('/addNation', nationController.addNaion)
    nationRouter.get('/getMusic/:id', nationController.getMusic)
    nationRouter.get('/getAll', nationController.getAllNation)
    nationRouter.get('/getInternational', nationController.getInternational)
    nationRouter.get('/getVietNam', nationController.getVietNam)
    nationRouter.get('/getMusicOfNation', nationController.getMusicOfNationName)
    nationRouter.patch('/:id', nationController.updateNation)
    nationRouter.delete('/:id', nationController.deleteNation)
export default nationRouter