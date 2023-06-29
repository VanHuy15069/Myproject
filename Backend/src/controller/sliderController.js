import * as sliderService from '../services/sliderService'

export const addSlider = async (req, res) => {
    try {
        const image = req.file.filename
        console.log(req.file);
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await sliderService.addSliderService(image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateSlider = async (req, res) => {
    try {
        const id = req.params.id
        const image = req.file.filename
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await sliderService.updateSliderService(image, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const deleteSlider = async (req, res) => {
    try {
        const id = req.params.id
        const response = await sliderService.deleteSliderService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getSliders = async (req, res) => {
    try {
        const response = await sliderService.getSliderService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}