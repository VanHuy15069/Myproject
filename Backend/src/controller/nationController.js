import * as nationService from '../services/nationService'

export const addNaion = async (req, res) => {
    try {
        const nationName = req.body.nationName
        const image = req.file.filename
        if(!nationName || !image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await nationService.addNaionService(nationName, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getMusic = async(req, res) => {
    try {
        const response = await nationService.getMusicService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getAllNation = async (req, res) => {
    try {
        const response = await nationService.getAllNationService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getOnly = async(req, res) => {
    try {
        const {limit, name, sort} = req.query
        const response = await nationService.getOnlyService(req.params.id, limit, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const updateNation = async (req, res) => {
    try {
        const id = req.params.id
        const nationName = req.body.nationName
        if(!nationName){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await nationService.updateNationService(id, nationName)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const updateImage = async(req, res) => {
    try {
        const id = req.params.id
        const image = req.file.filename
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await nationService.updateImageService(id, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const deleteNation = async (req, res) => {
    try {
        const response = await nationService.deleteNationService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getInternational = async (req, res) => {
    try {
        const {limit, offset, name, sort} = req.query
        const response = await nationService.getInternationalService(limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getVietNam = async (req, res) => {
    try {
        const {limit, offset, name, sort} = req.query
        const response = await nationService.getVietNamService(limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getMusicOfNationName = async (req, res) => {
    try {
        const {nationName,limit, offset, name, sort} = req.query
        if(!nationName){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await nationService.getMusicOfNationNameService(nationName, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}