import * as musicService from '../services/musicService'

export const addMusic = async (req, res) => {
    try {
        const {categoryId,topicId, nationId, singerId, musicName} = req.body
        const musicLink = req.files.musicLink[0].filename
        const image = req.files.image[0].filename
        if(!categoryId || !singerId || !musicName || !musicLink || !image || !nationId || !topicId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.addMusicService(req.body, image, musicLink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateImage = async (req, res) => {
    try {
        const id = req.params.id
        const image = req.file.filename
        if(!image){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.updateImageService(id, image)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateMusic = async (req, res) => {
    try {
        const id = req.params.id
        const musicLink = req.file.filename
        if(!musicLink){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.updateMusicService(id, musicLink)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const updateInforMusic = async (req, res) => {
    try {
        const id = req.params.id
        const {categoryId, topicId, nationId, singerId, musicName} = req.body
        if(!categoryId || !singerId || !musicName || !topicId || !nationId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.updateInforMusicService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const upgrateVip = async (req, res) => {
    try {
        const id = req.params.id
        const response = await musicService.upgrateVipService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const {limit, offset,name, sort} = req.query
        const response = await musicService.getByCategoryService(categoryId, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getBySinger = async (req, res) => {
    try {
        const singerId = req.params.id
        const {limit, offset, name, sort} = req.query
        const response = await musicService.getBySingerService(singerId, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const serchNameMusic = async (req, res) => {
    try {
        const {musicName, limit, offset, name, sort} = req.query
        const response = await musicService.searchNameMusicService(musicName, limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const countViews = async (req, res) => {
    try {
        const response = await musicService.countViewService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const deleteMusic = async (req, res) => {
    try {
        const response = await musicService.deleteMusicService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getAllMusic = async (req, res) => {
    try {
        const {limit, offset, name, sort} = req.query
        const response = await musicService.getAllMusicService(limit, offset, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getOfWeekly = async (req, res) => {
    try {
        const response = await musicService.getOfWeeklyService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getOneMusic = async (req, res) => {
    try {
        const response = await musicService.getOneMusicService(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const favorite = async (req, res) => {
    try {
        const id = req.params.id
        const {name, sort} = req.query
        const response = await musicService.favoriteService(id, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getTopNewMusic = async (req, res) => {
    try {
        const {limit, name, sort} = req.query
        const response = await musicService.topNewMusicService(limit, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const randomMusic = async(req, res) => {
    try {
        const {userId, topicId, categoryId, nationId, limit} = req.query
        if(!userId) {
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.randomMusicService(userId, topicId, categoryId, nationId, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getTheSameMusic = async(req, res) => {
    try {
        const {categoryId, topicId, limit, name, sort} = req.query
        const musicId = req.params.id
        if(!categoryId || !topicId || !musicId){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.getTheSameMusicService(categoryId, topicId, musicId, limit, name, sort)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getMusicOfMonth = async (req, res) => {
    try {
        const month = req.query.month
        if(!month){
            return res.status(404).json({
                err: 1,
                msg: 'Full information is required'
            })
        }
        const response = await musicService.getMusicOfMonthService(month)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const countCategory = async(req, res) => {
    try {
        const response = await musicService.countCategoryService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const countNation = async(req, res) => {
    try {
        const response = await musicService.countNationService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const countTopic = async(req, res) => {
    try {
        const response = await musicService.countTopicService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}

export const getTopMusic = async (req, res) => {
    try {
        const limit = req.query.limit
        const response = await musicService.getTopMusicService(limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'failure' + error
        })
    }
}