import express from 'express'
import * as nationController from '../controller/nationController'
import * as upLoad from '../controller/uploadController'

const nationRouter = express.Router()
    nationRouter.post('/addNation', upLoad.uploadImage ,nationController.addNaion)
    nationRouter.get('/getMusic/:id', nationController.getMusic)
    nationRouter.get('/getAll', nationController.getAllNation)
    nationRouter.get('/getOnly/:id', nationController.getOnly)
    nationRouter.get('/getInternational', nationController.getInternational)
    nationRouter.get('/getVietNam', nationController.getVietNam)
    nationRouter.get('/getMusicOfNation', nationController.getMusicOfNationName)
    nationRouter.patch('/:id', nationController.updateNation)
    nationRouter.patch('/image/:id', upLoad.uploadImage, nationController.updateImage)
    nationRouter.delete('/:id', nationController.deleteNation)
export default nationRouter