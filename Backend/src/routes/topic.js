import express from 'express'
import * as upload from '../controller/uploadController'
import * as topicController from '../controller/topicController'

const topicRouter = express.Router()
    topicRouter.post('/addTopic', upload.uploadImage, topicController.addTopic)
    topicRouter.get('/getOnly/:id', topicController.detailTopic)
    topicRouter.get('/getAll', topicController.getAllTopic)
    topicRouter.patch('/updateTitle/:id', topicController.updateTopic)
    topicRouter.patch('/updateImage/:id', upload.uploadImage, topicController.updateImage)
    topicRouter.delete('/:id', topicController.deleteTopic)
export default topicRouter