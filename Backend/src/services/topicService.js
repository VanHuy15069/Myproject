import db from "../models";
import path from "path";
import fs from 'fs'
export const addTopic = (title, image) => 
    new Promise(async(resolve, reject) => {
        try {
            const [topic, created] = await db.Topic.findOrCreate({
                where: {title: title},
                defaults: {
                    title: title,
                    image: image
                }
            })
            if(!created) {
                resolve({
                    err: 2,
                    msg: 'This topic already exists'
                })
            }
            resolve({
                response: topic,
                err: 0,
                msg: 'Add data sucesfuly'
            })
        } catch (error) {
            reject(error)
        }
    })

export const detailTopicService = (id, limit, offset, name, sort) => 
    new Promise(async(resolve, reject) => {
        try {
            const query = {}
            if(limit) query.limit = Number(limit)
            if(offset) query.offset = Number(offset*limit)
            if(!name) name = 'id'
            if(!sort) sort = 'DESC'
            const topic = await db.Topic.findByPk(id,{
                include: [
                    {
                        model: db.Music,
                        ...query,
                        order: [[name, sort]],
                        as: 'musicInfo',
                        include: [{
                            model: db.Singer,
                            as: 'singerInfo'
                        }]
                    }
                ]
            })
            resolve({
                response: topic,
                err: 0,
                msg: 'Get data sucesfuly'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllTopicService = (limit, name, sort, topicLimit) =>
    new Promise(async(resolve, reject) => {
        const query = {}
        if(!limit) limit = 3
        if(!name) name = 'createdAt'
        if(!sort) sort = 'DESC'
        if(topicLimit) query.limit = Number(topicLimit)
        try {
            const topic = await db.Topic.findAndCountAll({
                ...query,
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        limit: Number(limit),
                        order: [[name, sort]],
                        attributes: ['image']
                    }
                ]
            })
            resolve({
                response: topic,
                err: 0,
                msg: 'Get data sucesfuly'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateTopicService = (title, id) =>
    new Promise(async(resolve, reject) => {
        try {
            const topic = await db.Topic.findByPk(id)
            if(!topic){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await topic.update({title: title})
            resolve({
                err: 0,
                msg: 'Update data sucesfuly'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateImageService = (image, id) =>
    new Promise(async(resolve, reject) => {
        try {
            const topic = await db.Topic.findByPk(id)
            if(!topic){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${topic.image}`);
            await topic.update({image: image})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Update data sucesfuly'
            }) 
        } catch (error) {
            reject(error)
        }
    })

export const deleteTopicService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const topic = await db.Topic.findByPk(id)
            if(!topic){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const musics = await db.Music.findAll({where: {topicId: id}})
            if(musics){
                musics.forEach(async music => {
                    await db.Favorite.destroy({where: {musicId: music.id}})
                    const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
                    const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${music.musicLink}`);
                    fs.unlinkSync(clearImg)
                    fs.unlinkSync(clearMusic)
                })
                await db.Music.destroy({where: {topicId: id}})
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${topic.image}`);
            await topic.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Delete data sucesfuly'
            }) 
        } catch (error) {
            reject(error)
        }
    })