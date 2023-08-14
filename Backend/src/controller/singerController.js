import * as singerService from '../services/singerService'

export const addSinger = async (req, res) => {
    try {
        const {singerName, description} = req.body
        const image = req.file.filename
        if(!singerName || !description || !image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await singerService.addSingerService(req.body, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateSinger = async (req, res) => {
    try {
        const id = req.params.id
        const {singerName, description} = req.body
        if(!singerName || !description){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await singerService.updateSingerService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateAvata = async (req, res) => {
    try {
        const id = req.params.id
        const image = req.file.filename
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await singerService.updateAvataService(image, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const deleteSinger = async (req, res) => {
    try {
        const id = req.params.id
        const response = await singerService.deleteSingerService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getOneSinger = async (req, res) => {
    try {
        const id = req.params.id
        const response = await singerService.getOneSingerService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getAllSinger = async (req, res) => {
    try {
        const response = await singerService.getAllSingerService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const searchSinger = async (req, res) => {
    try {
        const {singerName, limit, offset, name, sort} = req.query
        const response = await singerService.searchSingerService(singerName, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const randomSinger = async (req, res) => {
    try {
        const id = req.params.id
        const {limit, offset} = req.query
        const response = await singerService.randomSingerService(id, limit, offset)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getByCategory = async(req, res) =>{
    try {
        const id = req.params.id
        const limit = req.query.limit
        const response = await singerService.getByCategoryService(id, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getByTopic = async(req, res) =>{
    try {
        const id = req.params.id
        const limit = req.query.limit
        const response = await singerService.getByTopicService(id, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getByNation = async(req, res) => {
    try {
        const id = req.params.id
        const limit = req.query.limit
        const response = await singerService.getByNationService(id, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}