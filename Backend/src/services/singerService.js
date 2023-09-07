import db, { sequelize } from "../models";
import fs from 'fs'
import path from "path";
import { Op } from "sequelize";

export const addSingerService = (data, image) => 
    new Promise(async(resolve, reject) => {
        try {
            const [singer, created] = await db.Singer.findOrCreate({
                where: {singerName: data.singerName},
                defaults: {
                    singerName: data.singerName,
                    description: data.description,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This singer already exists'
                })
            }
            resolve({
                response: singer,
                err: 0,
                msg: 'Add data successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateSingerService = (data, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await singer.update({
                singerName: data.singerName,
                description: data.description,
            })
            resolve({
                err: 0,
                msg: 'Update successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateAvataService = (image, id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${singer.image}`);
            await singer.update({image: image})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Update successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteSingerService = (id) =>
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const musics = await db.Music.findAll({where: {singerId: id}})
            if(musics){
                musics.forEach(async music => {
                    await db.Favorite.destroy({where: {musicId: music.id}})
                    const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
                    const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${music.musicLink}`);
                    fs.unlinkSync(clearImg)
                    fs.unlinkSync(clearMusic)
                })
                await db.Music.destroy({where: {singerId: id}})
            }
            await db.Follow.destroy({where: {singerId: id}})
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${singer.image}`);
            await singer.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Delete successfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOneSingerService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const singer = await db.Singer.findOne({where: {id: id}})
            if(!singer){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: singer,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllSingerService = () => 
    new Promise(async (resolve, reject) => {
        try {
            const singers = await db.Singer.findAndCountAll()
            resolve({
                response: singers.rows,
                count: singers.count,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const searchSingerService = (singerName, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = 5
            if(offset) queries.offset = Number(limit*offset)
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const singer = await db.Singer.findAndCountAll({
                where: {singerName: {[Op.substring]: singerName}},
                ...queries,
                order: [[name, sort]]
            })
            resolve({
                response: singer,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const randomSingerService = (id, limit, offset) => 
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(limit*offset)
            const singers = await db.Singer.findAndCountAll({
                where: {id: {[Op.ne] : id}},
                order: sequelize.random(),
                ...queries
            })
            resolve({
                response: singers,
                err: 0,
                msg: 'Successfully retrieved information'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getByCategoryService = (categoryId, limit) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            const singer = await db.Singer.findAll({
                attributes: ['id', 'singerName', 'image'],
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        attributes: ['id'],
                        include: [
                            {
                                model: db.Category,
                                as: 'categoryInfo',
                                where: {id: categoryId},
                                attributes: ['id']
                            }
                        ]
                    }
                ]
            })
            if(singer){
                const singerOK = await singer.filter(item => item.musicInfo.length > 0)
                await singerOK.sort((a,b) => b.musicInfo.length - a.musicInfo.length)
                resolve({
                    response: singerOK.slice(0, Number(limit)),
                    er: 0,
                    msg: 'Successfully retrieved information'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

    export const getByTopicService = (topicId, limit) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            const singer = await db.Singer.findAll({
                attributes: ['id', 'singerName', 'image'],
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        attributes: ['id'],
                        include: [
                            {
                                model: db.Topic,
                                as: 'topicInfo',
                                where: {id: topicId},
                                attributes: ['id']
                            }
                        ]
                    }
                ]
            })
            if(singer){
                const singerOK = await singer.filter(item => item.musicInfo.length > 0)
                await singerOK.sort((a,b) => b.musicInfo.length - a.musicInfo.length)
                resolve({
                    response: singerOK.slice(0, Number(limit)),
                    er: 0,
                    msg: 'Successfully retrieved information'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

    export const getByNationService = (nationId, limit) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit = 5
            const singer = await db.Singer.findAll({
                attributes: ['id', 'singerName', 'image'],
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        attributes: ['id'],
                        include: [
                            {
                                model: db.Nation,
                                as: 'nationInfo',
                                where: {id: nationId},
                                attributes: ['id']
                            }
                        ]
                    }
                ]
            })
            if(singer){
                const singerOK = await singer.filter(item => item.musicInfo.length > 0)
                await singerOK.sort((a,b) => b.musicInfo.length - a.musicInfo.length)
                resolve({
                    response: singerOK.slice(0, Number(limit)),
                    er: 0,
                    msg: 'Successfully retrieved information'
                })
            }
        } catch (error) {
            reject(error)
        }
    })