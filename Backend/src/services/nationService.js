import db from "../models";
import path from "path";
import fs from 'fs'
export const addNaionService = (nationName, image) =>
    new Promise(async(resolve, reject) => {
        try {
            const [nation, created] = await db.Nation.findOrCreate({
                where: {nationName: nationName},
                defaults: {
                    nationName: nationName,
                    image: image
                }
            })
            if(!created){
                resolve({
                    err: 2,
                    msg: 'This nation already exists'
                })
            }
            resolve({
                response: nation,
                err: 0,
                msg: 'Add data sucesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getMusicService = (nationId) =>
    new Promise(async(resolve, reject) => {
        try {
            const music = await db.Nation.findAll({
                where: {id: nationId},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo'
                    }
                ]
            })
            resolve({
                response: music,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllNationService = () =>
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findAll()
            resolve({
                response: nation,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getOnlyService = (id, limit, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            if(!limit) limit =  5
            if(!name) name = 'id'
            if(!sort) sort = 'ASC'
            const nation = await db.Nation.findByPk(id,{
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        order: [[name, sort]],
                        limit: Number(limit),
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo',
                                attributes: ['id', 'singerName', 'image']
                            }
                        ]
                    }
                ]
            })
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            resolve({
                response: nation,
                err: 0,
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateNationService = (id, nationName) => 
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findByPk(id) 
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            await nation.update({nationName: nationName})
            resolve({
                err: 0,
                msg: 'Update data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const updateImageService = (id, image) =>
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findByPk(id)
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${nation.image}`);
            await nation.update({image: image})
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Update data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const deleteNationService = (id) => 
    new Promise(async(resolve, reject) => {
        try {
            const nation = await db.Nation.findByPk(id)
            if(!nation){
                resolve({
                    err: 2,
                    msg: 'This data does not exist'
                })
            }
            const musics = await db.Music.findAll({where: {nationId: id}})
            if(musics){
                if(musics){
                    musics.forEach(async music => {
                        await db.Favorite.destroy({where: {musicId: music.id}})
                        const clearImg = path.resolve(__dirname, '..', '', `public/Images/${music.image}`);
                        const clearMusic = path.resolve(__dirname, '..', '', `public/Images/${music.musicLink}`);
                        fs.unlinkSync(clearImg)
                        fs.unlinkSync(clearMusic)
                    })
                    await db.Music.destroy({where: {nationId: id}})
                }
            }
            const clearImg = path.resolve(__dirname, '..', '', `public/Images/${nation.image}`);
            await nation.destroy()
            fs.unlinkSync(clearImg)
            resolve({
                err: 0,
                msg: 'Delete data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getInternationalService = (limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Nation.findOne({
                where: {nationName: 'Âu Mỹ'}, 
                include:[
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
                        order: [[name, sort]],
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo'
                            }
                        ]
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
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getVietNamService = (limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Nation.findOne({
                where: {nationName: 'Việt Nam'},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
                        order: [[name, sort]],
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo'
                            }
                        ]
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
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })

export const getMusicOfNationNameService = (nationName, limit, offset, name, sort) =>
    new Promise(async(resolve, reject) => {
        try {
            const queries = {}
            if(limit) queries.limit = Number(limit)
            if(offset) queries.offset = Number(offset*limit)
            if(!name) name = 'createdAt'
            if(!sort) sort = 'DESC'
            const music = await db.Nation.findAll({
                where: {nationName: nationName},
                include: [
                    {
                        model: db.Music,
                        as: 'musicInfo',
                        ...queries,
                        order: [[name, sort]],
                        include: [
                            {
                                model: db.Singer,
                                as: 'singerInfo'
                            }
                        ]
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
                msg: 'Get data succesfully'
            })
        } catch (error) {
            reject(error)
        }
    })
