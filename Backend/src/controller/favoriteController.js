import * as favoriteService from '../services/favoriteService'

export const addFavorite = async (req, res) => {
    try {
        const {userId, musicId} = req.body
        if(!userId || !musicId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await favoriteService.addFavoriteService(userId, musicId)
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
        const id = req.params.id
        const {name, sort} = req.query
        const response = await favoriteService.getMusicService(id, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const {userId, musicId} = req.query
        if(!userId || !musicId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await favoriteService.deleteFavoriteService(userId, musicId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}

export const isFavorite = async(req, res) => {
        try {
            const {userId, musicId} = req.query
            if(!userId || !musicId){
                return res.status(404).json({
                    err: 1,
                    msg: 'Full information is required'
                })
            }
            const response = await favoriteService.isFavoriteService(userId, musicId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failure ' + error
            })
        }
}

export const getFavorite = async(req, res) => {
    try {
        const musicId = req.query.musicId
        if(!musicId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await favoriteService.getFavoriteService(musicId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure ' + error
        })
    }
}