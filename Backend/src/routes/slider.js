import express from 'express'
import * as sliderController from '../controller/sliderController'
import * as upload from '../controller/uploadController'
const sliderRouter = express.Router()
    sliderRouter.post('/addSlider', upload.uploadImage,sliderController.addSlider)
    sliderRouter.patch('/:id', upload.uploadImage, sliderController.updateSlider)
    sliderRouter.delete('/:id', sliderController.deleteSlider)
    sliderRouter.get('/getSlider', sliderController.getSliders)
export default sliderRouter