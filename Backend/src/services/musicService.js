import db from "../models";
import fs from 'fs'
import path from "path";
import { Op } from "sequelize";

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
            if(!limit) limit = 5
            if(!offset) offset = 0
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const music = await db.Music.findAndCountAll({
                where: {musicName: {[Op.substring]: musicName}},
                limit: Number(limit),
                offset: Number(limit*offset),
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
            await music.destroy()
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
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'id'
            if(!sort) sort = 'ASC'
            const music = await db.Music.findAll({
                ...queries,
                order: [[name, sort]],
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
                response: music,
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
                where: {nationId: nationId},
                limit: Number(limit),
                order: [['views', 'DESC']],
                where: {updatedAt: {[Op.gte]: sevenDaysAgo}},
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
                        model: db.Category,
                        as: 'categoryInfo',
                    },
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