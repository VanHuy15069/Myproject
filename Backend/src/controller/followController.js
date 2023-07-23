import * as followService from '../services/followService'

export const addFollow = async (req, res) => {
    try {
        const {userId, singerId} = req.body
        if(!userId || !singerId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await followService.addFollowService(userId, singerId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const countFollows = async (req, res) => {
    try {
        const response = await followService.countFollowService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getSinger = async (req, res) => {
    try {
        const id = req.params.id
        const {limit, offset, name, sort} = req.query
        const response = await followService.getSingerService(id, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const deleteFollow = async (req, res) => {
    try {
        const {userId, singerId}= req.query
        if(!userId || !singerId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await followService.deleteFollowService(userId, singerId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const isFollow = async (req, res) => {
    try {
        const {userId, singerId} = req.query
        if(!userId || !singerId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await followService.isFollowService(userId, singerId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const getSingerPopular = async(req, res) => {
    try {
        const response = await followService.getSingerPopularService(req.query.limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}