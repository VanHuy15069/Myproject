import * as topicService from '../services/topicService'

export const addTopic = async (req, res) => {
    try {
        const title = req.body.title
        const image = req.file.filename
        if(!title || !image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await topicService.addTopic(title, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const detailTopic = async (req, res) => {
    try {
        const {limit, offset, name, sort} = req.query
        const response = await topicService.detailTopicService(req.params.id, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getAllTopic = async (req, res) => {
    try {
        const {limit, name, sort, topicLimit} = req.query
        const response = await topicService.getAllTopicService(limit, name, sort, topicLimit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateTopic = async (req, res) => {
    try {
        const id = req.params.id
        const title = req.body.title
        if(!title){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await topicService.updateTopicService(title, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateImage = async (req,  res) => {
    try {
        const id = req.params.id
        const image = req.file.filename
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await topicService.updateImageService(image, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const deleteTopic = async (req, res) => {
    try {
        const response = await topicService.deleteTopicService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}