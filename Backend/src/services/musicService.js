import db, { Sequelize, sequelize } from "../models";
import fs from 'fs'
import path from "path";
import { Op } from "sequelize";
import moment from "moment";

export const addMusicService = (data, image, link) => 
    new Promise(async(resolve, reject) => {
        try {
            const [music, created] = await db.Music.findOrCreate({
                where: {musicName: data.musicName},
                defaults: {
                    categoryId: data.categoryId,
                    topicId: data.topicId,
                    nationId: data.nationId,
                    singerId: data.singerId,
                    musicName: data.musicName,
                    musicLink: link,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This music already exists'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateImageService = (id, image) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
            await music.update({image: image})
            fs.unlinkSync(clearImg)  
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateMusicService = (id, musicLink) =>
    new Promise(async (resolve, reject) => {
        try {
            const link = await db.Music.findOne({where: {id: id}})
            if(!link){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${link.musicLink}`);
            await link.update({musicLink: musicLink})
            fs.unlinkSync(clearMusic)  
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateInforMusicService = (data, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await music.update({
                categoryId: data.categoryId,
                topicId: data.topicId,
                nationId: data.nationId,
                singerId: data.singerId,
                musicName: data.musicName,
            })
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const upgrateVipService = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            else{
                if(!music.vip){
                    await music.update({vip: true})
                }else{
                    await music.update({vip: false})
                }
                resolve({
                    err: 0,
                    msg: 'Update data successfully'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

export const getByCategoryService = (categoryId, limit, offset, name, sort) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const music = await db.Music.findAndCountAll({
                where: {categoryId: categoryId},
                ...queries,
                order: [[name, sort]],
                include: [
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getBySingerService = (singerId, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const music = await db.Music.findAndCountAll({
                where: {singerId: singerId},
                ...queries,
                order: [[name, sort]],
                include: [
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const searchNameMusicService = (musicName, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = 5
            if(offset) queries.offset = Number(limit*offset)
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const music = await db.Music.findAndCountAll({
                where: {musicName: {[Op.substring]: musicName}},
                ...queries,
                order: [[name, sort]],
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const countViewService = (id) =>
    new Promise(async(resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await music.update({views: music.views + 1})
            resolve({
                err: 0,
                msg: 'Update data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteMusicService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const music = await db.Music.findOne({where: {id: id}})
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await db.Favorite.destroy({where: {musicId: id}})
            const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${music.musicLink}`);
            const clearImage = path.resolve(__dirname, '..', '', `public/Images/${music.image}`)
            await music.destroy()
            fs.unlinkSync(clearMusic)
            fs.unlinkSync(clearImage)
            resolve({
                err: 0,
                msg: 'Delete data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllMusicService = (limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            const order = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'id'
            if(!sort) sort = 'ASC'
            if(name === 'musicName')  order.order = [[Sequelize.literal(`CONVERT(${name} USING utf8mb4) COLLATE utf8mb4_unicode_ci`), sort]]
            else order.order = [[name, sort]]
            const music = await db.Music.findAndCountAll({
                ...queries,
                ...order,
                include: [
                    {   
                        model: db.Topic,
                        as: 'topicInfo',
                    },
                    {
                        model: db.Nation,
                        as: 'nationInfo',
                    },
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music.rows,
                count: music.count,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOfWeeklyService = (nationId, limit) => 
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 10
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            const music = await db.Music.findAll({
                limit: Number(limit),
                order: [['views', 'DESC']],
                where: {nationId: nationId,updatedAt: {[Op.gte]: sevenDaysAgo}},
                include: [
                    {   
                        model: db.Category,
                        as: 'categoryInfo',
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOneMusicService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const music = await db.Music.findByPk(id, {
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const favoriteService = (userId, name, sort) =>
    new Promise(async(resolve, reject) => {
        if(!name) name = 'createdAt'
        if(!sort) sort = 'DESC'
        try {
            const music = await db.Music.findAll({
                include: [
                    {
                        model: db.Favorite,
                        as: 'musicFavorite',
                        where: {userId: userId},
                        order: [[name, sort]]
                    },
                    {
                        model: db.Singer,
                        as: 'singerInfo'
                    }
                ]
            })
            if(!music){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: music,
                err: 0,
                msg: 'Get data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const topNewMusicService = (limit, name, sort) => 
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 50
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const thirtyDayAgo = new Date()
            thirtyDayAgo.setDate(thirtyDayAgo.getDate() - 30)
            const music = await db.Music.findAll({
                where: { createdAt: {[Op.gte]: thirtyDayAgo}},
                limit: Number(limit),
                order: [[name, sort]],
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data ok!'
            })
        } catch (error) {
            reject(error)
        }
    })

export const randomMusicService = (userId, topicId, categoryId, nationId, limit) =>
    new Promise(async(resolve, reject) => {
        try {
            const arr = []
            const queries = {}
            if(!limit) limit = 5
            if(topicId) queries.topicId = topicId
            if(categoryId) queries.categoryId = categoryId
            if(nationId) queries.nationId = nationId
            const favorite = await db.Favorite.findAll({
                where: {userId: userId}
            })
            await favorite.forEach(item => arr.push(item.musicId))
            const music = await db.Music.findAll({
                limit: Number(limit),
                order: sequelize.random(),
                where: {id: {[Op.notIn]: arr}, ...queries},
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo',
                        attributes: ['id', 'singerName', 'image']
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'OK'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getTheSameMusicService = (categoryId, topicId, musicId, limit, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const musics = await db.Music.findAll({
                where: {[Op.or]: [{categoryId: categoryId}, {topicId: topicId}], id: {[Op.ne]: musicId}},
                ...queries,
                order: [[name, sort]],
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo'
                    }
                ]
            })
            const currentMusic = await db.Music.findByPk(musicId,{
                include: [
                    {
                        model: db.Singer,
                        as: 'singerInfo'
                    }
                ]
            })
            musics.unshift(currentMusic)
            resolve({
                response: musics,
                err: 0,
                msg: 'Get data OK'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getMusicOfMonthService = (month) => 
    new Promise(async(resolve, reject) => {
        try {
            const currentYear = moment().year();
            const startOfMonth = new Date(currentYear, month - 1, 1);
            const endOfMonth = new Date(currentYear, month, 0, 23, 59, 59, 999);
            const topSong = await db.Music.findAll({
                where: {
                    createdAt: {[Op.between]: [startOfMonth, endOfMonth], }
                },
                order: [['createdAt', 'DESC']],
                limit: 9,
                include: [{
                    model: db.Singer,
                    as: 'singerInfo',
                    attributes: ['singerName']
                }]
            })
            const arr = []
            for(const song of topSong){
                const favorite = await db.Favorite.findAndCountAll({
                    where: {musicId: song.id}
                })
                const obj = {}
                obj.musicName = song.musicName
                obj.image = song.image
                obj.views = song.views
                obj.favorite = favorite.count
                obj.createdAt = song.createdAt
                obj.singer = song.singerInfo.singerName
                arr.push(obj)
            }
            resolve({
                response: arr,
                err: 0,
                msg: 'OK'
            })
            
        } catch (error) {
            reject(error)
        }
    })

export const countCategoryService = () =>
    new Promise(async(resolve, reject) => {
        try {
            const categories = await db.Music.findAll({
                attributes: ['categoryId', [Sequelize.fn('COUNT', Sequelize.col('categoryId')), 'count']],
                group: ['categoryId'],
                include: [{
                    model: db.Category,
                    as: 'categoryInfo',
                    attributes: ['categoryName']
                }]
            })
            const arr = []
            for(const item of categories){
                const obj = {}
                obj.name = item.categoryInfo.categoryName
                obj.count = item.dataValues.count
                arr.push(obj)
            }
            resolve({
                response: arr,
                err: 0,
                msg: "OK"
            })
        } catch (error) {
            reject(error)
        }
    })

export const countNationService = () => 
    new Promise(async(resolve, reject) => {
        try {
            const nations = await db.Music.findAll({
                attributes: ['nationId', [Sequelize.fn('COUNT', Sequelize.col('nationId')), 'count']],
                group: ['nationId'],
                include: [{
                    model: db.Nation,
                    as: 'nationInfo',
                    attributes: ['nationName']
                }]
            })
            const arr = []
            for(const item of nations){
                const obj = {}
                obj.name = item.nationInfo.nationName
                obj.count = item.dataValues.count
                arr.push(obj)
            }
            resolve({
                response: arr,
                err: 0,
                msg: "OK"
            })
        } catch (error) {
            reject(error)
        }
    })

    export const countTopicService = () => 
    new Promise(async(resolve, reject) => {
        try {
            const topics = await db.Music.findAll({
                attributes: ['topicId', [Sequelize.fn('COUNT', Sequelize.col('topicId')), 'count']],
                group: ['topicId'],
                include: [{
                    model: db.Topic,
                    as: 'topicInfo',
                    attributes: ['title']
                }]
            })
            const arr = []
            for(const item of topics){
                const obj = {}
                obj.name = item.topicInfo.title
                obj.count = item.dataValues.count
                arr.push(obj)
            }
            resolve({
                response: arr,
                err: 0,
                msg: "OK"
            })
        } catch (error) {
            reject(error)
        }
    })

export const getTopMusicService = (limit) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            const musics = await db.Music.findAll({
                attributes: ['id','musicName', 'image', 'views', 'createdAt'],
                order: [['views', 'DESC']],
                limit: Number(limit),
                include: [{
                    model: db.Singer,
                    as: 'singerInfo',
                    attributes: ['singerName']
                }]
            })
            const arr  = []
            for(const song of musics){
                const favorite = await db.Favorite.findAndCountAll({
                    where: {musicId: song.id}
                })
                const obj = {}
                obj.musicName = song.musicName
                obj.image = song.image
                obj.views = song.views
                obj.createdAt = song.createdAt
                obj.singerName = song.singerInfo.singerName,
                obj.favorite = favorite.count
                arr.push(obj)
            }
            resolve({
                response: arr,
                err: 0,
                msg: "OK"
            })
        } catch (error) {
            reject(error)
        }
    })